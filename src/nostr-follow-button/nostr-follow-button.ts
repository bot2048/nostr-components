import { NDKUser, NDKUserProfile } from "@nostr-dev-kit/ndk";
import { nostrService } from "../common/nostr-service";
import { getLoadingNostrich, getNostrLogo, getSuccessAnimation } from "../common/theme-variables";
import { getFollowButtonStyles } from "./nostr-follow-button.style";
import { Theme } from "../common/types";

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
  const relayArray = userRelays.split(",");
  // Add each relay to the service
  for (const relay of relayArray) {
  await nostrService.addRelay(relay);
  }
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
  return ["relays", "npub", "theme"];
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

  this.shadowRoot!.innerHTML = getFollowButtonStyles(this.theme, this.isLoading);
 
  this.shadowRoot!.innerHTML += `
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
    ? `<small>${this.errorMessage}</small>`
    : ''
  }
  </div>
  `;

  this.attachEventListeners();
  }
}

customElements.define("nostr-follow-button", NostrFollowButton);