import { Theme } from '../common/types';

export const getZapButtonStyles = (theme: Theme) => `
  .zap-button-container {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .zap-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 14px;
    line-height: 1.2;
    cursor: pointer;
    border: none;
    outline: none;
    transition: all 0.2s ease;
    min-width: 120px;
    position: relative;
    overflow: hidden;
    ${theme === 'dark' 
      ? `
        background: linear-gradient(135deg, #8a63d2 0%, #cf5dd8 100%);
        color: white;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        &:hover {
          background: linear-gradient(135deg, #9b72d8 0%, #d97fe0 100%);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
        }
        &:active {
          transform: translateY(1px);
        }
      ` 
      : `
        background: linear-gradient(135deg, #6c2bd9 0%, #b32dd1 100%);
        color: white;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        &:hover {
          background: linear-gradient(135deg, #7d3fe9 0%, #c23fdb 100%);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        &:active {
          transform: translateY(1px);
        }
      `
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none !important;
    }
  }

  .zap-icon {
    font-size: 16px;
    display: inline-flex;
    align-items: center;
  }

  .zap-amount {
    font-weight: 600;
  }

  .loading-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    animation: spin 1s linear infinite;
    margin-right: 6px;
  }

  .error-icon {
    margin-right: 6px;
  }

  .error-message {
    margin-top: 6px;
    font-size: 12px;
    color: ${theme === 'dark' ? '#ff6b6b' : '#e74c3c'};
    text-align: center;
    max-width: 200px;
    line-height: 1.3;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
