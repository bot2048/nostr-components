import { Theme } from '../common/types';
import { themeVariables } from '../common/theme-variables';

export function getProfileBadgeStyles(theme: Theme) {
  // Get theme-specific values
  const backgroundColor = themeVariables.background[theme];
  const textColor = themeVariables.text[theme];
  const borderColor = themeVariables.border[theme];
  const hoverColor = themeVariables.hover[theme];
  const borderRadius = themeVariables.borderRadius.medium;

  return `
    <style>
      :host {
        --nstrc-profile-badge-background: ${backgroundColor};
        --nstrc-profile-badge-text-color: ${textColor};
        --nstrc-profile-badge-border-color: ${borderColor};
        --nstrc-profile-badge-hover-background: ${hoverColor};
        --nstrc-profile-badge-border-radius: ${borderRadius};
        
        /* Component specific variables */
        --nstrc-profile-badge-width: fit-content;
        --nstrc-profile-badge-padding: ${themeVariables.spacing.md};
        --nstrc-profile-badge-font-size: ${themeVariables.fontSize.default};
        --nstrc-profile-badge-font-family: Inter, system-ui, -apple-system, sans-serif;
        --nstrc-profile-badge-name-font-weight: 600;
        --nstrc-profile-badge-nip05-font-weight: 400;
        --nstrc-profile-badge-gap: ${themeVariables.spacing.md};
        --nstrc-profile-badge-avatar-size: 48px;
        --nstrc-profile-badge-name-color: var(--nstrc-profile-badge-text-color);
        --nstrc-profile-badge-nip05-color: var(--nstrc-profile-badge-text-color);
        --nstrc-profile-badge-nip05-opacity: 0.7;
        --nstrc-profile-badge-copy-foreground-color: var(--nstrc-profile-badge-text-color);
        
        /* Skeleton loading variables */
        --nstrc-profile-badge-skeleton-min-hsl: ${theme === 'light' ? '0, 0%, 94%' : '0, 0%, 15%'};
        --nstrc-profile-badge-skeleton-max-hsl: ${theme === 'light' ? '0, 0%, 98%' : '0, 0%, 25%'};
      }
      
      .nostr-profile-badge {
        width: var(--nstrc-profile-badge-width);
        background-color: var(--nstrc-profile-badge-background);
        color: var(--nstrc-profile-badge-text-color);
        border: 1px solid var(--nstrc-profile-badge-border-color);
        border-radius: var(--nstrc-profile-badge-border-radius);
        padding: var(--nstrc-profile-badge-padding);
        font-family: var(--nstrc-profile-badge-font-family);
        font-size: var(--nstrc-profile-badge-font-size);
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: var(--nstrc-profile-badge-gap);
        transition: background-color 0.2s ease;
      }
      
      .nostr-profile-badge:hover {
        background-color: var(--nstrc-profile-badge-hover-background);
      }
      
      .nostr-profile-badge-avatar {
        width: var(--nstrc-profile-badge-avatar-size);
        height: var(--nstrc-profile-badge-avatar-size);
        border-radius: 50%;
        object-fit: cover;
      }
      
      .nostr-profile-badge-info {
        display: flex;
        flex-direction: column;
      }
      
      .nostr-profile-badge-name {
        color: var(--nstrc-profile-badge-name-color);
        font-weight: var(--nstrc-profile-badge-name-font-weight);
        margin: 0;
      }
      
      .nostr-profile-badge-nip05 {
        color: var(--nstrc-profile-badge-nip05-color);
        opacity: var(--nstrc-profile-badge-nip05-opacity);
        font-weight: var(--nstrc-profile-badge-nip05-font-weight);
        margin: ${themeVariables.spacing.xs} 0 0;
      }
      
      .nostr-profile-badge-npub {
        display: flex;
        align-items: center;
        gap: ${themeVariables.spacing.xs};
        font-size: ${themeVariables.fontSize.small};
        margin-top: ${themeVariables.spacing.xs};
        color: var(--nstrc-profile-badge-copy-foreground-color);
        opacity: 0.7;
      }
      
      .nostr-profile-badge-copy {
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.2s ease;
      }
      
      .nostr-profile-badge-copy:hover {
        opacity: 1;
      }
      
      /* Skeleton loading animation */
      @keyframes skeleton-loading {
        0% {
          background-color: hsl(var(--nstrc-profile-badge-skeleton-min-hsl));
        }
        100% {
          background-color: hsl(var(--nstrc-profile-badge-skeleton-max-hsl));
        }
      }
      
      .skeleton {
        animation: skeleton-loading 1s linear infinite alternate;
      }
      
      .skeleton-avatar {
        width: var(--nstrc-profile-badge-avatar-size);
        height: var(--nstrc-profile-badge-avatar-size);
        border-radius: 50%;
      }
      
      .skeleton-text {
        width: 80px;
        height: 14px;
        margin-bottom: 6px;
        border-radius: 2px;
      }
    </style>
  `;
}
