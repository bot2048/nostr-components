/**
 * Common utility functions and type definitions used across components
 */

// Import only types needed
import { Theme } from './types';

/**
 * Masks a nostr public key (npub) by showing only a few characters at the beginning and end
 * @param npubString The full npub string to mask
 * @param length Number of characters to show at beginning and end
 * @returns A masked npub string like npub1abc...xyz
 */
export function maskNPub(npubString: string = '', length=3): string {
  const npubLength = npubString.length;

  if(npubLength !== 63) {
  return 'Invalid nPub';
  }

  let result = 'npub1';

  for(let i=5; i<length+5; i++) {
  result += npubString[i];
  }

  result += '...';

  let suffix = '';
  for(let i=npubLength-1; i>=npubLength-length; i--) {
  suffix = npubString[i] + suffix;
  }

  result += suffix;

  return result;
}

/**
 * Stats interface used for post statistics
 */
export type Stats = {
  likes: number,
  reposts: number,
  zaps: number,
  replies: number,
};

/**
 * Extract media items (images, videos, links) from post content and tags
 * @param content Post content text
 * @param tags Array of tags associated with the post
 * @returns Array of media items with type and value
 */
export function extractMediaItems(content: string, tags: any[]): any[] {
  const mediaItems: any[] = [];
  
  // Regular file URLs in content
  const urlRegex = /(https?:\/\/[^\s]+\.(?:jpg|jpeg|gif|png|mp4|mov|avi|webm))\b/gi;
  let match;
  while ((match = urlRegex.exec(content)) !== null) {
  const url = match[1];

  // Skip image URLs that are already represented by tags
  if (!tags.some(tag => tag[0] === 'url' && tag[1] === url)) {
  const extension = url.split('.').pop()?.toLowerCase();

  // Determine the type based on the extension
  const type = ['jpg', 'jpeg', 'gif', 'png'].includes(extension || '') ? 'image' :
  ['mp4', 'mov', 'avi', 'webm'].includes(extension || '') ? 'video' : 'link';
  
  mediaItems.push({
  type,
  value: url
  });
  }
  }
  
  return mediaItems;
}
