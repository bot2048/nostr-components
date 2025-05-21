import NDK, { 
  NDKEvent, 
  NDKFilter, 
  NDKKind, 
  NDKNip07Signer, 
  NDKRelay, 
  NDKRelaySet, 
  NDKSubscription, 
  NDKUser, 
  NDKUserProfile,
  ProfilePointer 
} from '@nostr-dev-kit/ndk';
import { Stats } from './utils';

/**
 * Configuration options for NostrService
 */
export interface NostrServiceOptions {
  /** List of relay URLs to connect to */
  relays?: string[];
  /** Whether to automatically connect on instantiation */
  autoConnect?: boolean;
  /** Whether to use NIP-07 browser extension signer */
  useNip07?: boolean;
}

/**
 * Default relay list if none is provided
 */
import { DEFAULT_RELAYS } from './constants';


/**
 * NostrService provides a centralized interface for Nostr functionality
 * across all components. It manages a single NDK instance and provides
 * methods for common Nostr operations.
 */
export class NostrService {
  private ndk: NDK;
  private relayUrls: string[];
  private _isConnected: boolean = false;
  private _isConnecting: boolean = false;
  private _user: NDKUser | null = null;

  /**
   * Create a new NostrService instance
   * @param options Configuration options
   */
  constructor(options: NostrServiceOptions = {}) {
    this.relayUrls = options.relays || DEFAULT_RELAYS;
    
    // Initialize NDK with provided relays
    this.ndk = new NDK({
      explicitRelayUrls: this.relayUrls,
      signer: options.useNip07 ? new NDKNip07Signer() : undefined
    });

    // Auto-connect if specified
    if (options.autoConnect) {
      this.connectToNostr();
    }
  }

  /**
   * Connect to the Nostr network
   * @returns Promise that resolves when connected
   */
  async connectToNostr(): Promise<boolean> {
    if (this._isConnected) {
      return true;
    }

    if (this._isConnecting) {
      // Wait for existing connection attempt to complete
      while (this._isConnecting) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      return this._isConnected;
    }

    try {
      this._isConnecting = true;
      await this.ndk.connect();
      this._isConnected = true;
      return true;
    } catch (error) {
      console.error('Error connecting to Nostr', error);
      return false;
    } finally {
      this._isConnecting = false;
    }
  }

  /**
   * Get the list of connected relays
   * @returns Array of connected NDKRelay objects
   */
  getRelays(): NDKRelay[] {
  return Array.from(this.ndk.pool.relays.values());
  }

  /**
   * Get the list of relay URLs
   * @returns Array of relay URLs
   */
  getRelayUrls(): string[] {
  return this.relayUrls;
  }

  /**
   * Add a new relay to the connection pool
   * @param relayUrl The URL of the relay to add
   */
  async addRelay(relayUrl: string): Promise<void> {
    if (!this.relayUrls.includes(relayUrl)) {
      this.relayUrls.push(relayUrl);
      
      // If `addExplicitRelay` exists, prefer it to avoid dropping state
      if (typeof this.ndk.addExplicitRelay === 'function') {
        this.ndk.addExplicitRelay(relayUrl);
      } else {
        // Fallback: preserve signer when reinitializing
        const signer = this.ndk.signer;
        this.ndk = new NDK({
          explicitRelayUrls: this.relayUrls,
          signer
        });
      }
      
      if (this._isConnected) {
        await this.ndk.connect(); // Ensure the new relay is connected
      }
    }
  }
  

  /**
   * Remove a relay from the connection pool
   * @param relayUrl The URL of the relay to remove
   */
  async removeRelay(relayUrl: string): Promise<void> {
    const index = this.relayUrls.indexOf(relayUrl);
    if (index !== -1) {
      this.relayUrls.splice(index, 1);
  
      // Preserve signer while reinitializing
      const signer = this.ndk.signer;
      this.ndk = new NDK({
        explicitRelayUrls: this.relayUrls,
        signer
      });
  
      if (this._isConnected) {
        await this.ndk.connect(); // Reconnect with updated relay list
      }
    }
  }
  

  /**
   * Get a user profile by npub or hex key
   * @param identifier npub or hex key
   * @returns Promise resolving to the NDKUser
   */
  async getProfile(identifier: string): Promise<NDKUser | null> {
  try {
  await this.ensureConnected();
  const user = await this.ndk.getUser({ npub: identifier });
  await user.fetchProfile();
  return user;
  } catch (error) {
  console.error('Error fetching profile', error);
  return null;
  }
  }
  
  /**
   * Get a user by various identifiers
   * @param options Options for identifying the user
   * @returns NDKUser instance
   */
  getUser(options: { npub?: string, pubkey?: string }): NDKUser {
  return this.ndk.getUser(options);
  }

  /**
   * Get a post by its note ID
   * @param noteId The note ID to fetch
   * @returns Promise resolving to the NDKEvent
   */
  async getPost(noteId: string): Promise<NDKEvent | null> {
  try {
  await this.ensureConnected();
  // Use fetchEvent instead of getEvent
  const event = await this.ndk.fetchEvent(noteId);
  return event;
  } catch (error) {
  console.error('Error fetching post', error);
  return null;
  }
  }

  /**
   * Get posts by a user
   * @param userIdentifier npub or hex key of the user
   * @param limit Maximum number of posts to fetch
   * @returns Promise resolving to an array of NDKEvents
   */
  async getUserPosts(userIdentifier: string, limit: number = 20): Promise<NDKEvent[]> {
    try {
      await this.ensureConnected();
      const user = await this.ndk.getUser({ npub: userIdentifier });
      
      const filter: NDKFilter = {
        authors: [user.pubkey],
        kinds: [NDKKind.Text],
        limit
      };
      
      const events = await this.ndk.fetchEvents(filter);
      return Array.from(events);
    } catch (error) {
      console.error('Error fetching user posts', error);
      return [];
    }
  }

  /**
   * Get stats for a specific post (likes, reposts, zaps, replies)
   * @param noteId The note ID to get stats for
   * @returns Promise resolving to a Stats object
   */
  async getPostStats(noteId: string): Promise<Stats> {
    try {
      await this.ensureConnected();
      
      const reactions = await this.ndk.fetchEvents({
        kinds: [NDKKind.Reaction],
        '#e': [noteId]
      });
      
      const reposts = await this.ndk.fetchEvents({
        kinds: [NDKKind.Repost],
        '#e': [noteId]
      });
      
      const zaps = await this.ndk.fetchEvents({
        kinds: [NDKKind.Zap],
        '#e': [noteId]
      });
  
      const replies = await this.ndk.fetchEvents({
        kinds: [NDKKind.Text],
        '#e': [noteId]
      });
  
      return {
        likes: reactions.size,
        reposts: reposts.size,
        zaps: zaps.size,
        replies: replies.size
      };
    } catch (error) {
      console.error('Error getting post stats', error);
      return { likes: 0, reposts: 0, zaps: 0, replies: 0 };
    }
  }

  /**
   * Follow a user
   * @param userPubkey The public key of the user to follow
   * @returns Promise resolving to success status
   */
  async followUser(userPubkey: string): Promise<boolean> {
  try {
  await this.ensureConnected();
  
  if (!this.ndk.signer) {
  throw new Error('No signer available. Use NIP-07 or provide a signer.');
  }
  
  // Get the current user
  const currentUser = await this.ndk.signer.user();
  
  // Fetch the current contact list
  const contactListEvents = await this.ndk.fetchEvents({
    authors: [currentUser.pubkey],
    kinds: [NDKKind.Contacts]
  });
  
  let contactList: NDKEvent;
  if (contactListEvents.size === 0) {
    // Create a new contact list if none exists
    contactList = new NDKEvent(this.ndk);
    contactList.kind = NDKKind.Contacts;
  } else {
    // Use the most recent contact list
    contactList = Array.from(contactListEvents)[0];
  }
  
    // Add the new user to the contact list
    const tags = contactList.tags ?? [];
    contactList.tags = [...tags, ['p', userPubkey]];    
    // Publish the updated contact list
    await contactList.publish();
    return true;
  } catch (error) {
    console.error('Error following user', error);
    return false;
  }
}

  /**
   * Subscribe to events matching a filter
   * @param filter The filter to apply
   * @param callback Function to call for each matching event
   * @returns The subscription object
   */
  subscribeToEvents(filter: NDKFilter, callback: (event: NDKEvent) => void): NDKSubscription {
    const subscription = this.ndk.subscribe(filter);
    subscription.on('event', callback);
    return subscription;
  }

  /**
   * Ensure that we're connected to Nostr before proceeding
   * @private
   */
  private async ensureConnected(): Promise<void> {
    if (!this._isConnected) {
      await this.connectToNostr();
    }
  }

  /**
   * Get the NDK instance
   * @returns The NDK instance
   */
  getNDK(): NDK {
    return this.ndk;
  }

  /**
   * Check if connected to Nostr
   * @returns Connection status
   */
  get isConnected(): boolean {
    return this._isConnected;
  }

  /**
   * Get the current user if signed in with NIP-07
   * @returns The current user or null
   */
  get currentUser(): NDKUser | null {
    return this._user;
  }

  /**
   * Set the current user
   * @param user The user to set as current
   */
  set currentUser(user: NDKUser | null) {
  this._user = user;
  }
}

// Export singleton instance for global use
export const nostrService = new NostrService({ autoConnect: true });

// Export default for more explicit imports
export default NostrService;
