export interface NostrZapButtonOptions {
  buttonText?: string;
  loading?: boolean;
  disabled?: boolean;
  zapIcon?: boolean;
}

const defaultZapIconSVG = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
`;

export function renderZapButton(options?: NostrZapButtonOptions): string {
  const text = options?.buttonText || 'Zap';
  const isLoading = options?.loading || false;
  const isDisabled = options?.disabled || false;
  const showIcon = options?.zapIcon === undefined ? true : options.zapIcon;

  let buttonContent = '';
  if (showIcon) {
    buttonContent += defaultZapIconSVG;
  }
  buttonContent += `<span class="button-text">${text}</span>`;

  if (isLoading) {
    buttonContent = `<span class="loading-spinner"></span> <span class="button-text">Zapping...</span>`;
  }

  return `
    <style>
      .nostr-zap-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 8px 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #f0f0f0;
        color: #333;
        cursor: pointer;
        font-family: inherit;
        font-size: inherit;
      }
      .nostr-zap-button:hover {
        background-color: #e0e0e0;
      }
      .nostr-zap-button:disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }
      .nostr-zap-button svg {
        margin-right: ${showIcon && text ? '8px' : '0'};
        width: 1em;
        height: 1em;
      }
      .loading-spinner {
        border: 2px solid #f3f3f3; /* Light grey */
        border-top: 2px solid #3498db; /* Blue */
        border-radius: 50%;
        width: 1em;
        height: 1em;
        animation: spin 1s linear infinite;
        margin-right: 8px;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
    <button class="nostr-zap-button" ${isDisabled || isLoading ? 'disabled' : ''}>
      ${buttonContent}
    </button>
  `;
}
