import { NDKUser, NDKNip07Signer, NDKZapper } from '@nostr-dev-kit/ndk';

declare global {
  interface Window {
    webln?: {
      sendPayment: (invoice: string) => Promise<{ preimage: string; paymentHash?: string }>;
      // Add other webln methods if needed, e.g., getInfo, makeInvoice
    };
  }
}
import { DEFAULT_RELAYS } from '../common/constants';
import { NostrService } from '../common/nostr-service';
import { renderZapButton, NostrZapButtonOptions } from './render';

const DEFAULT_ZAP_AMOUNT_SATS = 10;

export default class NostrZapButton extends HTMLElement {
  private nostrService: NostrService = NostrService.getInstance();
  private boundHandleClick: (() => void) | null = null;

  private isLoading: boolean = false;
  private errorMessage: string | null = null;
  private successMessage: string | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  // Attribute Getters
  get relays(): string[] {
    const userRelays = this.getAttribute('relays');
    return userRelays ? userRelays.split(',') : DEFAULT_RELAYS;
  }

  get zapRecipientNpub(): string | null {
    return this.getAttribute('data-npub');
  }

  get zapRecipientNevent(): string | null {
    return this.getAttribute('data-nevent');
  }

  get zapRecipientNip05(): string | null {
    return this.getAttribute('data-nip05');
  }

  get zapAmountSats(): number {
    const amount = this.getAttribute('data-amount');
    return amount ? parseInt(amount, 10) : DEFAULT_ZAP_AMOUNT_SATS;
  }

  get zapComment(): string {
    return this.getAttribute('data-comment') || '';
  }

  async connectedCallback() {
    await this.nostrService.connectToNostr(this.relays);
    this.render();
  }

  private async handleZapClick() {
    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;
    this.render();

    const ndk = this.nostrService.getNDK();
    if (!ndk) {
      this.errorMessage = 'NDK service not available.';
      this.isLoading = false;
      this.render();
      return;
    }

    // NIP-07 Signer is required for zapping
    const nip07Signer = new NDKNip07Signer();
    try {
        const nip07User = await nip07Signer.user();
        if (!nip07User.npub) {
            throw new Error('NIP-07 Signer not available or user not logged in.');
        }
        ndk.signer = nip07Signer;
    } catch (e: any) {
        this.errorMessage = e.message || 'NIP-07 Signer setup failed.';
        this.isLoading = false;
        this.render();
        return;
    }

    let zapTargetUser: NDKUser | null = null;

    try {
      if (this.zapRecipientNevent) {
        const eventId = this.zapRecipientNevent;
        const event = ndk.fetchEvent(eventId); // NDKEvent constructor is not public
        if (!event) {
          throw new Error(`Event not found: ${eventId}`);
        }
        // NDK fetchEvent returns Promise<NDKEvent | null>
        const fetchedEvent = await event;
        if (!fetchedEvent) {
             throw new Error(`Event not found: ${eventId}`);
        }
        zapTargetUser = fetchedEvent.author;
        await zapTargetUser.fetchProfile(); // Ensure profile (and LUD) is loaded
      } else if (this.zapRecipientNpub) {
        zapTargetUser = ndk.getUser({ npub: this.zapRecipientNpub });
        await zapTargetUser.fetchProfile();
      } else if (this.zapRecipientNip05) {
        const userFromNip05 = await ndk.getUserFromNip05(this.zapRecipientNip05);
        zapTargetUser = userFromNip05 || null;
        if (zapTargetUser) await zapTargetUser.fetchProfile();
      } else {
        this.errorMessage = 'No zap recipient specified (data-npub, data-nevent, or data-nip05).';
        this.isLoading = false;
        this.render();
        return;
      }

      if (!zapTargetUser) {
        throw new Error('Could not determine zap recipient.');
      }
      
      // Check if user has a lightning address
      if (!zapTargetUser.profile?.lud16 && !zapTargetUser.profile?.lud06) {
        throw new Error('Recipient does not have a lightning address configured for zaps.');
      }

      const amountMsats = this.zapAmountSats * 1000;
      const comment = this.zapComment;

      const lnPay = async ({ pr }: { pr: string }) => {
        console.log("NostrZapButton: Attempting to pay invoice:", pr);
        if (window.webln && typeof window.webln.sendPayment === 'function') {
          try {
            const result = await window.webln.sendPayment(pr);
            console.log("NostrZapButton: Payment result:", result);
            return { preimage: result.preimage };
          } catch (e: any) {
            console.error("NostrZapButton: WebLN payment failed", e);
            this.errorMessage = `WebLN Error: ${e.message || 'Payment failed'}`;
            // Do not throw here, let NDKZapper handle the zap failure based on lack of preimage
            return {}; 
          }
        } else {
          this.errorMessage = 'WebLN (NIP-07 compatible extension) not available to pay invoice.';
          console.warn("NostrZapButton: WebLN not available. Using mock preimage for testing.");
          // For testing without WebLN, return a mock preimage. 
          // In a real scenario, this branch means payment cannot proceed.
          // return { preimage: "00".repeat(32) }; 
          return {}; // Indicate failure to NDKZapper if no WebLN
        }
      };

      const zapper = new NDKZapper(zapTargetUser);
      const zapCallResult = await zapper.zap(amountMsats, comment || undefined, [], {lnPay});

      if (typeof zapCallResult === 'string') {
        const receiptId: string = zapCallResult;
        this.successMessage = `Zap successful! Receipt ID: ${receiptId.substring(0, 8)}...`;
        console.log("NostrZapButton: Zap successful, receipt ID:", receiptId);
      } else if (zapCallResult instanceof Map) {
        let receiptId: string | null = null;
        if (zapCallResult.size > 0) {
          for (const event of zapCallResult.values()) {
            // Check if event is likely an NDKEvent (has id and kind) and not an Error
            if (event && typeof (event as any).id === 'string' && typeof (event as any).kind === 'number') {
              receiptId = (event as any).id;
              break; // Use the first valid receipt found
            }
          }
        }
        if (receiptId) {
          this.successMessage = `Zap successful! Receipt ID (from Map): ${receiptId.substring(0, 8)}...`;
          console.log("NostrZapButton: Zap successful (from Map), receipt ID:", receiptId);
        } else {
          if (!this.errorMessage) {
            this.errorMessage = 'Zap sent, but no valid receipt ID found in Map response.';
          }
          console.error("NostrZapButton: Zap Map response did not contain a valid event ID or was empty, or contained errors.", zapCallResult);
        }
      } else if (zapCallResult && typeof (zapCallResult as any).id === 'string' && typeof (zapCallResult as any).kind === 'number') {
        // Check for NDKEvent object (has id and kind)
        const receiptId = (zapCallResult as any).id;
        this.successMessage = `Zap successful! Receipt Event ID: ${receiptId.substring(0, 8)}...`;
        console.log("NostrZapButton: Zap successful, receipt event ID:", receiptId);
      } else {
        // Fallback for null, undefined, or other unexpected types
        if (!this.errorMessage) { // Don't overwrite a more specific error from lnPay
            this.errorMessage = `Zap failed or returned an unexpected response. Type: ${typeof zapCallResult}. Check console.`;
        }
        console.error("NostrZapButton: Zap failed or unexpected response", zapCallResult);
      }
    } catch (e: any) {
      console.error("NostrZapButton: Zap process error:", e);
      this.errorMessage = e.message || 'An unexpected error occurred during zap.';
    } finally {
      this.isLoading = false;
      this.render();
    }
  }

  attachEventListeners() {
    const button = this.shadowRoot!.querySelector('.nostr-zap-button');
    if (!button) return;

    if (this.boundHandleClick) {
      button.removeEventListener('click', this.boundHandleClick);
    }
    this.boundHandleClick = this.handleZapClick.bind(this);
    button.addEventListener('click', this.boundHandleClick);
  }

  disconnectedCallback() {
    const button = this.shadowRoot?.querySelector('.nostr-zap-button');
    if (button && this.boundHandleClick) {
      button.removeEventListener('click', this.boundHandleClick);
      this.boundHandleClick = null;
    }
  }

  render() {
    let buttonText = 'Zap';
    if (this.isLoading) {
      buttonText = 'Zapping...';
    } else if (this.successMessage) {
      buttonText = 'Zapped!'; // Or show success message directly
    } else if (this.errorMessage) {
      buttonText = 'Error'; // Or show error message
    }

    const options: NostrZapButtonOptions = {
      buttonText: this.successMessage || this.errorMessage || buttonText,
      loading: this.isLoading,
      disabled: this.isLoading || !!this.successMessage, // Disable after success too
      zapIcon: !this.successMessage && !this.errorMessage, // Hide icon on final states
    };

    this.shadowRoot!.innerHTML = renderZapButton(options);
    this.attachEventListeners();
  }
}

customElements.define('nostr-zap-button', NostrZapButton);

