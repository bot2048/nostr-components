import { NDKEvent, NDKKind, NDKUser, NDKPrivateKeySigner, NDKSigner } from '@nostr-dev-kit/ndk';
import { nostrService } from '../common/nostr-service';
import { getZapButtonStyles } from './nostr-zap-button.style.js';
import { getLoadingNostrich } from '../common/theme-variables';
import { Theme } from '../common/types';

declare global {
  interface Window {
    webln?: {
      enable: () => Promise<void>;
      sendPayment: (invoice: string) => Promise<{ preimage: string }>;
    };
  }
}

export default class NostrZapButton extends HTMLElement {
  private rendered: boolean = false;
  private theme: Theme = 'light';
  private isLoading: boolean = false;
  private isError: boolean = false;
  private errorMessage: string = '';
  private amount: number = 1000; // Default 1000 sats
  private comment: string = '';
  private targetPubkey: string = '';
  private lnurl: string = '';
  private zapEndpoint: string = '';
  private zapRequest: string = '';

  static get observedAttributes() {
    return [
      'relays',
      'npub',
      'pubkey',
      'theme',
      'amount',
      'comment',
      'lnurl'
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    if (!this.rendered) {
      await this.configureRelays();
      await this.getTheme();
      await this.getAttributes();
      await nostrService.connectToNostr();
      this.render();
      this.rendered = true;
    }
  }

  private async getAttributes() {
    this.amount = parseInt(this.getAttribute('amount') || '1000');
    this.comment = this.getAttribute('comment') || '';
    this.lnurl = this.getAttribute('lnurl') || '';
    
    // Get target pubkey from npub or pubkey attribute
    const npub = this.getAttribute('npub');
    const pubkey = this.getAttribute('pubkey');
    
    if (npub) {
      const user = new NDKUser({ npub });
      this.targetPubkey = user.pubkey;
    } else if (pubkey) {
      this.targetPubkey = pubkey;
    } else {
      this.isError = true;
      this.errorMessage = 'Either npub or pubkey must be provided';
    }
  }

  private async configureRelays() {
    const userRelays = this.getAttribute('relays');

    if (userRelays) {
      const relayArray = Array.from(
        new Set(
          userRelays
            .split(',')
            .map(r => r.trim())
            .filter(Boolean)
        )
      );

      await Promise.all(relayArray.map(r => nostrService.addRelay(r)));
    }
  }

  private getTheme() {
    this.theme = 'light';
    const userTheme = this.getAttribute('theme');

    if (userTheme) {
      const isValidTheme = ['light', 'dark'].includes(userTheme);
      if (isValidTheme) {
        this.theme = userTheme as Theme;
      }
    }
  }

  private async handleZap() {
    if (!this.targetPubkey) {
      this.isError = true;
      this.errorMessage = 'No target pubkey available';
      this.render();
      return;
    }

    this.isLoading = true;
    this.render();

    try {
      // 1. Fetch receiver's metadata to get lud16/lud06
      const user = new NDKUser({ hexpubkey: this.targetPubkey });
      await user.fetchProfile();
      
      const lud16 = user.profile?.lud16 || user.profile?.lud06;
      
      if (!lud16 && !user.profile?.lud06) {
        throw new Error('No lightning address or LNURL found in profile');
      }

      // 2. Create zap request event
      const zapRequest = new NDKEvent(undefined, {
        kind: 9734 as NDKKind, // ZapRequest kind
        pubkey: '', // Will be set when signed
        created_at: Math.floor(Date.now() / 1000),
        tags: [
          ['p', this.targetPubkey],
          ['amount', (this.amount * 1000).toString()], // Convert to millisats
          ['relays', ...(await nostrService.getRelayUrls())],
        ],
        content: this.comment || ''
      });

      // 3. Sign the zap request with the current user's signer if available
      const signer = await nostrService.getSigner();
      if (signer) {
        await zapRequest.sign(signer);
      } else {
        // If no signer is available, we'll use an anonymous zap
        console.log('No signer available, sending anonymous zap');
      }

      // 4. Get invoice from LNURL or directly from lud16
      if (lud16) {
        await this.handleLightningAddress(zapRequest, lud16);
      } else if (user.profile?.lud06) {
        await this.handleLNURL(zapRequest, user.profile.lud06);
      }
    } catch (error) {
      console.error('Zap error:', error);
      this.isError = true;
      this.errorMessage = error instanceof Error ? error.message : 'Failed to process zap';
      this.isLoading = false;
      this.render();
    }
  }

  private async handleLightningAddress(zapRequest: NDKEvent, lud16: string) {
    // Extract username and domain from lud16 (username@domain.com)
    const [username, domain] = lud16.split('@');
    if (!username || !domain) {
      throw new Error('Invalid lightning address format');
    }

    // Fetch LNURL from .well-known/lnurlp
    const lnurlpUrl = `https://${domain}/.well-known/lnurlp/${username}`;
    const response = await fetch(lnurlpUrl);
    
    if (!response.ok) {
      throw new Error('Failed to fetch LNURLp');
    }
    
    const lnurlp = await response.json();
    
    if (lnurlp.status === 'ERROR') {
      throw new Error(lnurlp.reason || 'LNURLp error');
    }
    
    // Use the callback URL to get invoice
    const callbackUrl = new URL(lnurlp.callback);
    callbackUrl.searchParams.append('amount', (this.amount * 1000).toString()); // Convert to millisats
    callbackUrl.searchParams.append('nostr', JSON.stringify(zapRequest.rawEvent()));
    
    if (this.comment) {
      callbackUrl.searchParams.append('comment', this.comment);
    }
    
    const invoiceResponse = await fetch(callbackUrl.toString());
    if (!invoiceResponse.ok) {
      throw new Error('Failed to get invoice');
    }
    
    const invoiceData = await invoiceResponse.json();
    
    if (invoiceData.status === 'ERROR') {
      throw new Error(invoiceData.reason || 'Failed to get invoice');
    }
    
    // Open LNURL pay prompt or redirect to wallet
    this.openLightningWallet(invoiceData.pr);
  }

  private async handleLNURL(zapRequest: NDKEvent, lnurl: string) {
    // Handle LNURL-pay
    if (lnurl.startsWith('lnurl')) {
      const response = await fetch(`https://your-lnurl-proxy.com/?q=${encodeURIComponent(lnurl)}`);
      const data = await response.json();
      
      if (data.status === 'ERROR') {
        throw new Error(data.reason || 'LNURL error');
      }
      
      const callbackUrl = new URL(data.callback);
      callbackUrl.searchParams.append('amount', (this.amount * 1000).toString());
      callbackUrl.searchParams.append('nostr', JSON.stringify(zapRequest.rawEvent()));
      
      if (this.comment) {
        callbackUrl.searchParams.append('comment', this.comment);
      }
      
      const invoiceResponse = await fetch(callbackUrl.toString());
      const invoiceData = await invoiceResponse.json();
      
      if (invoiceData.status === 'ERROR') {
        throw new Error(invoiceData.reason || 'Failed to get invoice');
      }
      
      this.openLightningWallet(invoiceData.pr);
    }
  }

  private openLightningWallet(invoice: string) {
    // Try to open with WebLN if available
    if (typeof window.webln !== 'undefined') {
      window.webln!.enable()
        .then(() => {
          return window.webln!.sendPayment(invoice);
        })
        .then(() => {
          // Successfully paid
          this.dispatchEvent(new CustomEvent('zap', {
            detail: { amount: this.amount, invoice }
          }));
        })
        .catch((error: Error) => {
          console.error('WebLN payment failed:', error);
          this.dispatchEvent(new CustomEvent('zap:error', {
            detail: { message: error.message, amount: this.amount }
          }));
        })
        .finally(() => {
          this.isLoading = false;
          this.render();
        });
    } else {
      // Fallback to opening with a wallet link
      window.open(`lightning:${invoice}`, '_blank');
      this.isLoading = false;
      this.render();
      
      // Since we can't track the payment status with a direct link,
      // we'll just assume it was successful for UX purposes
      setTimeout(() => {
        this.dispatchEvent(new CustomEvent('zap', {
          detail: { amount: this.amount, invoice, status: 'pending' }
        }));
      }, 1000);
    }
  }

  render() {
    if (!this.shadowRoot) return;

    const styles = getZapButtonStyles(this.theme);
    const loadingIcon = getLoadingNostrich();

    let buttonContent = `
      <span class="zap-icon">⚡</span>
      <span class="zap-amount">${this.amount} sats</span>
    `;

    if (this.isLoading) {
      buttonContent = `
        <span class="loading-icon">${loadingIcon}</span>
        <span>Zapping...</span>
      `;
    } else if (this.isError) {
      buttonContent = `
        <span class="error-icon">⚠️</span>
        <span>Error</span>
      `;
    }

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="zap-button-container">
        <button class="zap-button" ?disabled="${this.isLoading}">
          ${buttonContent}
        </button>
        ${this.errorMessage ? `<div class="error-message">${this.errorMessage}</div>` : ''}
      </div>
    `;

    // Add click handler
    const button = this.shadowRoot.querySelector('.zap-button');
    if (button) {
      button.addEventListener('click', () => this.handleZap());
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    
    switch (name) {
      case 'amount':
        this.amount = parseInt(newValue) || 1000;
        break;
      case 'comment':
        this.comment = newValue || '';
        break;
      case 'lnurl':
        this.lnurl = newValue || '';
        break;
      case 'theme':
        this.getTheme();
        break;
    }
    
    this.render();
  }
}

// Register the custom element
if (!customElements.get('nostr-zap-button')) {
  customElements.define('nostr-zap-button', NostrZapButton);
}
