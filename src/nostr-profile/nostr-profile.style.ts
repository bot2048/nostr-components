import { Theme } from '../common/types';
import { themeVariables } from '../common/theme-variables';

export function getProfileStyles(theme: Theme) {
  // Get theme-specific values
  const backgroundColor = themeVariables.background[theme];
  const textColor = themeVariables.text[theme];
  const borderColor = themeVariables.border[theme];
  const accentColor = themeVariables.accent[theme];
  const borderRadius = themeVariables.borderRadius.medium;
  
  return `
    <style>
      :host {
        --nstrc-profile-background: ${backgroundColor};
        --nstrc-profile-text-color: ${textColor};
        --nstrc-profile-border-color: ${borderColor};
        --nstrc-profile-accent-color: ${accentColor};
        --nstrc-profile-border-radius: ${borderRadius};
        
        /* Component specific variables */
        --nstrc-profile-width: 100%;
        --nstrc-profile-max-width: 500px;
        --nstrc-profile-padding: ${themeVariables.spacing.lg};
        --nstrc-profile-font-size: ${themeVariables.fontSize.default};
        --nstrc-profile-font-family: Inter, system-ui, -apple-system, sans-serif;
        --nstrc-profile-avatar-size: 80px;
        --nstrc-profile-name-font-weight: 700;
        --nstrc-profile-bio-line-height: 1.4;
        --nstrc-profile-bio-color: var(--nstrc-profile-text-color);
        --nstrc-profile-bio-opacity: 0.9;
        --nstrc-profile-stats-border-color: ${theme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'};
        
        /* Skeleton loading variables */
        --nstrc-profile-skeleton-min-hsl: ${theme === 'light' ? '0, 0%, 94%' : '0, 0%, 15%'};
        --nstrc-profile-skeleton-max-hsl: ${theme === 'light' ? '0, 0%, 98%' : '0, 0%, 25%'};
      }
      
      .nostr-profile {
        width: var(--nstrc-profile-width);
        max-width: var(--nstrc-profile-max-width);
        background-color: var(--nstrc-profile-background);
        color: var(--nstrc-profile-text-color);
        border: 1px solid var(--nstrc-profile-border-color);
        border-radius: var(--nstrc-profile-border-radius);
        padding: var(--nstrc-profile-padding);
        font-family: var(--nstrc-profile-font-family);
        font-size: var(--nstrc-profile-font-size);
      }
      
      .nostr-profile-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-bottom: ${themeVariables.spacing.lg};
      }
      
      .nostr-profile-avatar {
        width: var(--nstrc-profile-avatar-size);
        height: var(--nstrc-profile-avatar-size);
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: ${themeVariables.spacing.md};
      }
      
      .nostr-profile-name {
        font-weight: var(--nstrc-profile-name-font-weight);
        margin: 0 0 ${themeVariables.spacing.xs};
      }
      
      .nostr-profile-nip05 {
        color: var(--nstrc-profile-text-color);
        opacity: 0.7;
        margin: 0 0 ${themeVariables.spacing.md};
      }
      
      .nostr-profile-bio {
        color: var(--nstrc-profile-bio-color);
        opacity: var(--nstrc-profile-bio-opacity);
        line-height: var(--nstrc-profile-bio-line-height);
        margin: ${themeVariables.spacing.md} 0;
        white-space: pre-wrap;
      }
      
      .nostr-profile-stats {
        display: flex;
        justify-content: space-around;
        border-top: 1px solid var(--nstrc-profile-stats-border-color);
        padding-top: ${themeVariables.spacing.md};
        margin-top: ${themeVariables.spacing.lg};
      }
      
      .nostr-profile-stat {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      
      .nostr-profile-stat-value {
        font-weight: bold;
        margin: 0;
      }
      
      .nostr-profile-stat-label {
        font-size: ${themeVariables.fontSize.small};
        opacity: 0.7;
        margin: ${themeVariables.spacing.xs} 0 0;
      }
      
      .nostr-profile-actions {
        display: flex;
        justify-content: center;
        margin-top: ${themeVariables.spacing.lg};
      }
      
      .nostr-profile-follow-button {
        background-color: var(--nstrc-profile-accent-color);
        color: white;
        border: none;
        border-radius: ${themeVariables.borderRadius.small};
        padding: ${themeVariables.spacing.sm} ${themeVariables.spacing.lg};
        font-weight: 600;
        cursor: pointer;
        transition: opacity 0.2s ease;
      }
      
      .nostr-profile-follow-button:hover {
        opacity: 0.9;
      }
      
      /* Skeleton loading animation */
      @keyframes skeleton-loading {
        0% {
          background-color: hsl(var(--nstrc-profile-skeleton-min-hsl));
        }
        100% {
          background-color: hsl(var(--nstrc-profile-skeleton-max-hsl));
        }
      }
      
      .skeleton {
        animation: skeleton-loading 1s linear infinite alternate;
      }
      
      .skeleton-avatar {
        width: var(--nstrc-profile-avatar-size);
        height: var(--nstrc-profile-avatar-size);
        border-radius: 50%;
      }
      
      .skeleton-text {
        height: 14px;
        margin-bottom: 6px;
        border-radius: 2px;
      }
      
      .skeleton-name {
        width: 120px;
      }
      
      .skeleton-nip05 {
        width: 150px;
      }
      
      .skeleton-bio {
        width: 100%;
        height: 60px;
      }
    </style>
  `;
}
