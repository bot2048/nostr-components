/**
 * Centralized SVG icons used throughout the Nostr Components
 * This file contains SVG markup as template strings for easy reuse
 */


/**
 * Reply icon (comment bubble)
 */
export const replyIcon = `
<svg width="18" height="18" viewBox="0 0 24 24" fill="#00b3ff">
  <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v3c0 .6.4 1 1 1h.5c.2 0 .4-.1.6-.2L16 18h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14h-4.8l-5.9 3.8V16H4V4h16v12z"/>
</svg>
`;

/**
 * Like icon (pink heart)
 */
export const likeIcon = `
<svg width="18" height="18">
  <g xmlns="http://www.w3.org/2000/svg">
    <path fill="#ff006d" d="M12.2197 1.65717C7.73973 1.25408 5.14439 0.940234 3.12891 2.6623C0.948817 4.52502 0.63207 7.66213 2.35603 9.88052C3.01043 10.7226 4.28767 11.9877 5.51513 13.1462C6.75696 14.3184 7.99593 15.426 8.60692 15.9671C8.61074 15.9705 8.61463 15.9739 8.61859 15.9774C8.67603 16.0283 8.74753 16.0917 8.81608 16.1433C8.89816 16.2052 9.01599 16.2819 9.17334 16.3288C9.38253 16.3912 9.60738 16.3912 9.81656 16.3288C9.97391 16.2819 10.0917 16.2052 10.1738 16.1433C10.2424 16.0917 10.3139 16.0283 10.3713 15.9774C10.3753 15.9739 10.3792 15.9705 10.383 15.9671C10.994 15.426 12.2329 14.3184 13.4748 13.1462C14.7022 11.9877 15.9795 10.7226 16.6339 9.88052C18.3512 7.67065 18.0834 4.50935 15.8532 2.65572C13.8153 0.961905 11.2476 1.25349 9.49466 2.78774Z"/>
  </g>
</svg>
`;

/**
 * Zap icon (lightning bolt)
 */
export const zapIcon = `
<svg width="18" height="18" viewBox="0 0 24 24" fill="#F5A623">
  <path d="M11 21h-1l1-7H7.5c-.58 0-.65-.31-.4-.6l4.95-5.93c.34-.4 1.18-.54 1.18-.12L12 14h4c.47 0 .68.33.4.65L12 21c-.33.4-.87.4-1 0z"/>
</svg>
`;

/**
 * Repost icon (circular arrows)
 */
export const repostIcon = `
<svg width="18" height="18" viewBox="0 0 24 24" fill="#10B981">
  <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
</svg>
`;

/**
 * Error icon (warning triangle)
 */
export const errorIcon = `
<svg width="18" height="18" viewBox="0 0 24 24" fill="#F43F5E">
  <path d="M12 2L1 21h22L12 2zm0 4.5l7.5 13h-15L12 6.5zm-1 5v4h2v-4h-2zm0 6v2h2v-2h-2z"/>
</svg>
`;
