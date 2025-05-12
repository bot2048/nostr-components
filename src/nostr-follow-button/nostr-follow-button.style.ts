import { Theme } from '../common/types';
import { themeVariables } from '../common/theme-variables';

export function getFollowButtonStyles(theme: Theme, isLoading: boolean) {
  // Get theme-specific values
  const backgroundColor = themeVariables.background[theme];
  const hoverBackgroundColor = themeVariables.hover[theme];
  const textColor = themeVariables.text[theme];
  const borderStyle = theme === 'light' ? `1px solid ${themeVariables.border.light}` : 'none';
  const borderRadius = themeVariables.borderRadius.medium;
  const fontSize = themeVariables.fontSize.default;
  const padding = `${themeVariables.spacing.md} ${themeVariables.spacing.lg}`;
  
  return `
    <style>
      :host {
        /* Theme specific variables */
        --nstrc-follow-btn-background: ${backgroundColor};
        --nstrc-follow-btn-hover-background: ${hoverBackgroundColor};
        --nstrc-follow-btn-text-color: ${textColor};
        --nstrc-follow-btn-border: ${borderStyle};
        
        /* Component specific variables */
        --nstrc-follow-btn-padding: ${padding};
        --nstrc-follow-btn-font-size: ${fontSize};
        --nstrc-follow-btn-border-radius: ${borderRadius};
        --nstrc-follow-btn-error-font-size: ${themeVariables.fontSize.small};
        --nstrc-follow-btn-error-line-height: 1em;
        --nstrc-follow-btn-error-max-width: 250px;
        --nstrc-follow-btn-horizontal-alignment: start;
        --nstrc-follow-btn-min-height: 47px;
      }

      .nostr-follow-button-container {
        display: flex;
        flex-direction: column;
        font-family: Inter,sans-serif;
        flex-direction: column;
        gap: ${themeVariables.spacing.sm};
        width: fit-content;
      }

      .nostr-follow-button-wrapper {
        display: flex;
        justify-content: var(--nstrc-follow-btn-horizontal-alignment);
      }

      .nostr-follow-button {
        display: flex;
        align-items: center;
        gap: ${themeVariables.spacing.md};
        border-radius: var(--nstrc-follow-btn-border-radius);
        background-color: var(--nstrc-follow-btn-background);
        cursor: pointer;
        min-height: var(--nstrc-follow-btn-min-height);
        border: var(--nstrc-follow-btn-border);
        padding: var(--nstrc-follow-btn-padding);
        font-size: var(--nstrc-follow-btn-font-size);
        color: var(--nstrc-follow-btn-text-color);

        ${isLoading ? 'pointer-events: none; user-select: none; background-color: var(--nstrc-follow-btn-hover-background);' : ''}
      }

      .nostr-follow-button:hover {
        background-color: var(--nstrc-follow-btn-hover-background);
      }

      .nostr-follow-button-error small {
        justify-content: flex-end;
        color: red;
        font-size: var(--nstrc-follow-btn-error-font-size);
        line-height: var(--nstrc-follow-btn-error-line-height);
        max-width: var(--nstrc-follow-btn-error-max-width);
      }
    </style>
  `;
}
