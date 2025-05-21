import { Theme } from '../common/types';
import { themeVariables } from '../common/theme-variables';

export function getPostStyles(theme: Theme) {
  // Get theme-specific values
  const backgroundColor = themeVariables.background[theme];
  const textColor = themeVariables.text[theme];
  const borderColor = themeVariables.border[theme];
  const accentColor = themeVariables.accent[theme];
  const borderRadius = themeVariables.borderRadius.medium;

  return `
    <style>
      :host {
        --nstrc-post-background: ${backgroundColor};
        --nstrc-post-text-color: ${textColor};
        --nstrc-post-border-color: ${borderColor};
        --nstrc-post-accent-color: ${accentColor};
        --nstrc-post-border-radius: ${borderRadius};
        
        /* Component specific variables */
        --nstrc-post-max-width: 550px;
        --nstrc-post-padding: ${themeVariables.spacing.lg};
        --nstrc-post-font-size: ${themeVariables.fontSize.default};
        --nstrc-post-font-family: Inter, system-ui, -apple-system, sans-serif;
        --nstrc-post-image-border-radius: ${themeVariables.borderRadius.small};
        --nstrc-post-content-line-height: 1.4;
      }
      
      .nostr-post {
        max-width: var(--nstrc-post-max-width);
        background-color: var(--nstrc-post-background);
        color: var(--nstrc-post-text-color);
        border: 1px solid var(--nstrc-post-border-color);
        border-radius: var(--nstrc-post-border-radius);
        padding: var(--nstrc-post-padding);
        font-family: var(--nstrc-post-font-family);
        font-size: var(--nstrc-post-font-size);
      }
      
      .nostr-post-header {
        display: flex;
        align-items: center;
        gap: ${themeVariables.spacing.md};
        margin-bottom: ${themeVariables.spacing.md};
      }
      
      .nostr-post-avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        object-fit: cover;
      }
      
      .nostr-post-author {
        flex: 1;
      }
      
      .nostr-post-name {
        font-weight: bold;
        margin: 0 0 4px;
      }
      
      .nostr-post-nip05, .nostr-post-date {
        font-size: ${themeVariables.fontSize.small};
        color: var(--nstrc-post-text-color);
        opacity: 0.7;
        margin: 0;
      }
      
      .nostr-post-content {
        margin-top: ${themeVariables.spacing.md};
        line-height: var(--nstrc-post-content-line-height);
      }
      
      /* Twitter-like hashtags and mentions styling */
      .nostr-post-hashtag, .nostr-post-mention {
        color: ${accentColor};
        text-decoration: none;
        cursor: pointer;
      }
      
      .nostr-post-hashtag:hover, .nostr-post-mention:hover {
        text-decoration: underline;
      }
      
      .nostr-post-images {
        margin-top: ${themeVariables.spacing.md};
        display: grid;
        grid-gap: ${themeVariables.spacing.sm};
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      }
      
      .nostr-post-image {
        width: 100%;
        border-radius: var(--nstrc-post-image-border-radius);
        object-fit: cover;
      }
      
      .nostr-post-footer {
        margin-top: ${themeVariables.spacing.md};
        display: flex;
        gap: ${themeVariables.spacing.lg};
        font-size: ${themeVariables.fontSize.small};
        color: var(--nstrc-post-text-color);
        opacity: 0.7;
      }
    </style>
  `;
}
