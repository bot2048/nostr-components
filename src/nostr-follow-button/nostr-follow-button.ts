import { NDKUser, NDKUserProfile } from "@nostr-dev-kit/ndk";
import { nostrService } from "../common/nostr-service";
import { getFollowButtonStyles } from './nostr-follow-button.style';
import { getLoadingNostrich, getNostrLogo, getSuccessAnimation } from '../common/theme-variables';
import { Theme } from '../common/types';
import { sanitizeHtml, sanitizeText } from '../common/sanitize';

export default class NostrFollowButton extends HTMLElement {
  private rendered: boolean = false;
  private theme: Theme = "light";

  private isLoading: boolean = false;
  private isError: boolean = false;
  private errorMessage: string = '';

  private isFollowed: boolean = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  configureRelays = async () => {
    const userRelays = this.getAttribute("relays");
  
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
  };
  

  getTheme = async () => {
    this.theme = "light";

    const userTheme = this.getAttribute("theme");

    if (userTheme) {
      const isValidTheme = ["light", "dark"].includes(userTheme);

      if (!isValidTheme) {
        throw new Error(
          `Invalid theme '${userTheme}'. Accepted values are 'light', 'dark'`
        );
      }

      this.theme = userTheme as Theme;
    }
  };

  async connectedCallback() {
    if (!this.rendered) {
      await this.configureRelays();
      await this.getTheme();
      await nostrService.connectToNostr();
      this.render();
      this.rendered = true;
    }
  }

  static get observedAttributes() {
    return ["relays", "npub", "nip05", "pubkey", "theme", "icon-width", "icon-height"];
  }

  async attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === "relays") {
      await this.configureRelays();
      await nostrService.connectToNostr();
    }

    if (name === "theme") {
      await this.getTheme();
    }
    
    this.render();
  }

  attachEventListeners() {
    this.shadowRoot!.querySelector('.nostr-follow-button')?.addEventListener('click', async () => {
      this.isError = false;
      this.isLoading = true;
      this.render();
      
      try {
        const userToFollowNpub = this.getAttribute('npub');
        const userToFollowNip05 = this.getAttribute('nip05');
        const userToFollowPubkey = this.getAttribute('pubkey');

        if(!userToFollowNpub && !userToFollowNip05 && !userToFollowPubkey) {
          this.errorMessage = 'Provide npub, nip05 or pubkey';
          this.isError = true;
        } else {
          let pubkeyToFollow: string | null = null;
        
          if(userToFollowPubkey) {
            pubkeyToFollow = userToFollowPubkey;
          } else if(userToFollowNpub) {
            const user = await nostrService.getProfile(userToFollowNpub);
            if (user) {
              pubkeyToFollow = user.pubkey;
            }
          } else if(userToFollowNip05) {
            const ndk = nostrService.getNDK();
            const userFromNip05 = await ndk.getUserFromNip05(userToFollowNip05);
            if(userFromNip05) {
              pubkeyToFollow = userFromNip05.pubkey;
            }
          }
  
          if(pubkeyToFollow) {
            const success = await nostrService.followUser(pubkeyToFollow);
            this.isFollowed = success;
          }
        }


      } catch(err) {
        this.isError = true;

        if(err.message && err.message.includes('NIP-07')) {
          this.errorMessage = `Looks like you don't have any nostr signing browser extension.
          Please checkout the following video to setup a signer extension - <a href="https://youtu.be/8thRYn14nB0?t=310" target="_blank">Video</a>`;
        } else {
          this.errorMessage = 'Please authorize, click the button to try again!';
        }

      } finally {
        this.isLoading = false;
      }

      this.render();
    });
  }

  render() {
  const iconWidthAttribute = this.getAttribute('icon-width');
  const iconHeightAttribute = this.getAttribute('icon-height');

  const iconWidth = iconWidthAttribute !== null ? Number(iconWidthAttribute): 25;
  const iconHeight = iconHeightAttribute !== null ? Number(iconHeightAttribute): 25;

  const buttonText = this.isFollowed ? 'Followed' : 'Follow';
  
  // Sanitize any user-generated content
  const sanitizedErrorMessage = this.isError ? sanitizeText(this.errorMessage) : '';

  // Create styles and button content separately to avoid modifying innerHTML multiple times
  const styles = getFollowButtonStyles(this.theme, this.isLoading);
  
  const buttonContent = `
  <div class="nostr-follow-button-container ${this.isError ? 'nostr-follow-button-error': ''}">
  <div class="nostr-follow-button-wrapper">
    <button class="nostr-follow-button">
    ${
    this.isLoading
    ? `${getLoadingNostrich(this.theme, iconWidth, iconHeight)} <span>Following...</span>`
    : this.isFollowed
    ? `${getSuccessAnimation(this.theme, iconWidth, iconHeight)} ${buttonText}`
    : `${getNostrLogo(this.theme, iconWidth, iconHeight)} <span>Follow me on Nostr</span>`
    }
    </button>
  </div>

  ${
    this.isError
    ? `<small>${sanitizedErrorMessage}</small>`
    : ''
  }
  </div>
  `;
  
  // Apply sanitized content to the DOM
  this.shadowRoot!.innerHTML = sanitizeHtml(styles + buttonContent);

  this.attachEventListeners();
  }
}

customElements.define("nostr-follow-button", NostrFollowButton);