import { NDKEvent, NDKUser, NDKUserProfile } from '@nostr-dev-kit/ndk';
import { nostrService } from '../common/nostr-service';
import { getProfileBadgeStyles } from './nostr-profile-badge.style';
import { maskNPub } from '../common/utils';
import { Theme } from '../common/types';
import { sanitizeHtml, sanitizeText } from '../common/sanitize';
import { errorIcon } from '../common/icons';

export default class NostrProfileBadge extends HTMLElement {
  private rendered: boolean = false;

  private userProfile: NDKUserProfile = {
  name: '',
  image: '',
  nip05: '',
  };

  private theme: Theme = 'light';

  private isLoading: boolean = true;
  private isError: boolean = false;

  private onClick: Function | null = null;

  private ndkUser: NDKUser;

  constructor() {
    super();
  }

  configureRelays = async () => {
    const userRelays = this.getAttribute('relays');

    if(userRelays) {
      const relayArray = userRelays.split(',');
      // Add each relay to the service
      for (const relay of relayArray) {
        await nostrService.addRelay(relay);
      }
    }
  }

  getNDKUser = async () => {
    const npub = this.getAttribute('npub');
    const nip05 = this.getAttribute('nip05');
    const pubkey = this.getAttribute('pubkey');

    if(npub) {
      return nostrService.getProfile(npub);
    } else if(nip05) {
      // For NIP-05 we need to use the NDK instance directly
      const ndk = nostrService.getNDK();
      return ndk.getUserFromNip05(nip05);
    } else if(pubkey) {
      return nostrService.getUser({ pubkey: pubkey });
    }

    return null;
  }

  getUserProfile = async () => {
    try {
      this.isLoading = true;
      this.render();

      const user = await this.getNDKUser();

      if (user?.npub) {
        this.ndkUser = user; 

        // Check if profile was fetched successfully
        if (user.profile) {
          this.userProfile = user.profile as NDKUserProfile;
          // Set default image only if profile exists but image is missing
          if (!this.userProfile.image) {
            this.userProfile.image = './assets/default_dp.png'
          }
          this.isError = false;
        } else {
          // Profile not found initially, just log and ensure default image if needed.
          // DO NOT reset name/nip05 here, as NDK might provide them later.
          console.warn(`Could not fetch profile initially for user ${user.npub}`);
          if (!this.userProfile.image) { // Only set default if absolutely no image is set yet
            this.userProfile.image = './assets/default_dp.png';
          }
          // Consider setting this.isError = true if profile is truly expected but not found?
          // For now, let's keep it false.
          this.isError = false; // Keep consistent with previous logic for now
        }

      } else {
        throw new Error('Either npub or nip05 should be provided');
      }

    } catch(err) {
      this.isError = true;
      throw err;
    } finally {
      this.isLoading = false;
      this.render();
    }
  }

  getTheme = async () => {
    this.theme = 'light';

    const userTheme = this.getAttribute('theme');

    if(userTheme) {
      const isValidTheme = ['light', 'dark'].includes(userTheme);

      if(!isValidTheme) {
        throw new Error(`Invalid theme '${userTheme}'. Accepted values are 'light', 'dark'`);
      }

      this.theme = userTheme as Theme;
    }
  }

  async connectedCallback() {
    const onClick = this.getAttribute("onClick");
    if(onClick !== null) {
      this.onClick = window[onClick];
    }

    this.attachShadow({ mode: 'open' });
    this.render();

    if (!this.rendered) {
      await this.configureRelays();
      await this.getTheme();
      await nostrService.connectToNostr();
      await this.getUserProfile();

      this.rendered = true;
    }
  }

  static get observedAttributes() {
  return ['relays', 'npub', 'pubkey', 'nip05', 'theme', 'show-npub', 'show-follow', 'onClick'];
  }

  async attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if(name === 'relays') {
      await this.configureRelays();
      await nostrService.connectToNostr();
    }

    if(['relays', 'npub', 'nip05'].includes(name)) {
      // Possible property changes - relays, npub, nip05
      // For all these changes, we have to fetch profile anyways
      // TODO: Validate npub
      this.getUserProfile();
    }

    if(name === "onClick") {
      this.onClick = window[newValue];
    }

    if(name === 'theme') {
      this.getTheme();
      this.render();
    }

    if(['show-npub', 'show-follow'].includes(name)) {
      this.render();
    }
  }

  disconnectedCallback() {
  // TODO: Check for cleanup method
  }

  renderNpub() {
    const npub = this.ndkUser?.npub;
    const npubAttribute = this.getAttribute('npub');
    const showNpub = this.getAttribute('show-npub');

    if(showNpub === 'false') {
      return '';
    }

    if(showNpub === null && this.userProfile.nip05) {
      return '';
    }

    if(!npubAttribute && !this.ndkUser.npub) {
      console.warn('Cannot use showNpub without providing a nPub');
      return '';
    }

    return `
      <div class="npub-container">
        <span class="npub">${maskNPub(npubAttribute || this.ndkUser.npub)}</span>
        <span id="npub-copy" class="copy-button">&#x2398;</span>
      </div>
    `;
  }

  copy(string: string) {
  navigator.clipboard.writeText(string);
  }

  onProfileClick() {

  if(this.isError) {
  return;
  }

  if(this.onClick !== null && typeof this.onClick === 'function')  {
  this.onClick(this.userProfile);
  return;
  }

  let key = '';

  const nip05 = this.getAttribute('nip05');
  const npub = this.getAttribute('npub');

  if(nip05) {
  key = nip05
  } else if(npub) {
  key = npub;
  } else {
  return;
  }

  window.open(`https://njump.me/${key}`, '_blank');
  }

  attachEventListeners() {
  this.querySelector('.nostr-profile-badge')?.addEventListener('click', (e) => {
  if(!(e.target as HTMLElement).closest('.nostr-follow-button-container')) {
  this.onProfileClick();
  }
  });

  this.querySelector('#npub-copy')?.addEventListener('click', (e) => {
  e.stopPropagation();
  this.copy(this.getAttribute('npub') || this.ndkUser.npub || '')
  });

  this.querySelector('#nip05-copy')?.addEventListener('click', (e) => {
  e.stopPropagation();
  this.copy(this.getAttribute('nip05') || this.userProfile.nip05 || '')
  });
  }

  render() {
  // Check for potentially undefined userProfile before accessing properties
  if (this.isLoading === false && this.userProfile && this.userProfile.image === undefined) {
  this.userProfile.image = './assets/default_dp.png'; // Ensure default image if needed post-load
  }

  const showNpub = this.getAttribute('show-npub') === 'true';
  const showFollow = this.getAttribute('show-follow') === 'true'; // Corrected attribute check
  let contentHTML = '';

  if (this.isLoading) {
  contentHTML = `
  <div class='nostr-profile-badge-container'>
    <div class='nostr-profile-badge-left-container'>
    <div class="skeleton img-skeleton"></div>
    </div>
    <div class='nostr-profile-badge-right-container'>
    <div class="skeleton text-skeleton-name"></div>
    <div class="skeleton text-skeleton-nip05"></div>
    </div>
  </div>
  `;
  // Apply loading class to host element
  this.classList.add('loading');
  this.classList.remove('error-container'); // Ensure error state is cleared
  } else if (this.isError) {
  contentHTML = `
  <div class='nostr-profile-badge-container'>
    <div class='nostr-profile-badge-left-container'>
    <div class="error">${errorIcon}</div>
    </div>
    <div class='nostr-profile-badge-right-container'>
    <span class="error-text">Unable to load</span>
    </div>
  </div>
  `;
  // Apply error class to host element
  this.classList.add('error-container');
  this.classList.remove('loading'); // Ensure loading state is cleared
  } else if (this.userProfile) {
  // Apply theme class to host element
  this.classList.toggle('dark', this.theme === 'dark');
  this.classList.remove('loading', 'error-container'); // Clear loading/error states

  // Sanitize user profile data to prevent XSS attacks
  const profileName = sanitizeText(this.userProfile.displayName || this.userProfile.name || maskNPub(this.ndkUser?.npub || ''));
  const profileImage = sanitizeText(this.userProfile.image || './assets/default_dp.png');
  const profileNip05 = this.userProfile.nip05 ? sanitizeText(this.userProfile.nip05) : '';

  contentHTML = `
  <div class='nostr-profile-badge-container'>
    <div class='nostr-profile-badge-left-container'>
    <img src='${profileImage}' alt='Nostr profile image of ${profileName}'/>
    </div>
    <div class='nostr-profile-badge-right-container'>
    <div class='nostr-profile-badge-name' title="${profileName}">${profileName}</div>
    ${profileNip05 ? `<div class='nostr-profile-badge-nip05' title="${profileNip05}">${profileNip05}</div>` : ''}
    ${showNpub ? this.renderNpub() : ''}
    ${showFollow && this.ndkUser ? `<nostr-follow-button pubkey="${this.ndkUser.pubkey}"></nostr-follow-button>` : ''}
    </div>
  </div>
  `;
  } else {
  // Handle case where userProfile is unexpectedly null/undefined after loading without error
  contentHTML = `<div>Error: Profile data unavailable.</div>`;
  this.classList.add('error-container');
  this.classList.remove('loading');
  }

  // Combine styles and content, then sanitize before assigning to innerHTML
  const completeHTML = getProfileBadgeStyles(this.theme) + contentHTML;
  
  // Sanitize the final HTML to prevent XSS attacks
  this.innerHTML = sanitizeHtml(completeHTML);

  this.attachEventListeners();
  }

}

customElements.define("nostr-profile-badge", NostrProfileBadge);
