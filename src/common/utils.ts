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
export function maskNPub(npubString: string = '', length = 3): string {
  if (!npubString) return 'Invalid nPub';

  // Validate the npub has the correct format
  if (!npubString.startsWith('npub1') || npubString.length !== 63) {
    return 'Invalid nPub';
  }

  // We know it starts with 'npub1', so preserve that
  let result = 'npub1';

  // Add the next few characters after 'npub1'
  for (let i = 5; i < length + 5 && i < npubString.length; i++) {
    result += npubString[i];
  }

  result += '...';

  // Add the last few characters
  let suffix = '';
  const endPos = Math.min(npubString.length, npubString.length - 1);
  const startPos = Math.max(5 + length, endPos - length);

  for (let i = endPos; i >= startPos; i--) {
    suffix = npubString[i] + suffix;
  }

  result += suffix;

  return result;
}

/**
 * Stats interface used for post statistics
 */
export type Stats = {
  likes: number;
  reposts: number;
  zaps: number;
  replies: number;
};

/**
 * Extract media items (images, videos, links) from post content and tags
 * @param content Post content text
 * @param tags Array of tags associated with the post
 * @returns Array of media items with type and value
 */
export type MediaItem = {
  type: 'image' | 'video' | 'link';
  value: string;
};

export function extractMediaItems(content: string, tags: any[]): MediaItem[] {
  const mediaItems: MediaItem[] = [];

  // Use a slightly more robust URL regex
  const urlRegex =
    /(https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)\.(?:jpg|jpeg|gif|png|mp4|mov|avi|webm))\b/gi;

  let match;
  while ((match = urlRegex.exec(content)) !== null) {
    try {
      const url = match[1];

      // Validate URL format
      try {
        new URL(url);
      } catch (e) {
        continue; // Skip invalid URLs
      }

      // Skip image URLs that are already represented by tags
      if (!tags.some(tag => tag[0] === 'url' && tag[1] === url)) {
        const extension = url.split('.').pop()?.toLowerCase();

        // Determine the type based on the extension
        const type = ['jpg', 'jpeg', 'gif', 'png'].includes(extension || '')
          ? 'image'
          : ['mp4', 'mov', 'avi', 'webm'].includes(extension || '')
            ? 'video'
            : 'link';

        mediaItems.push({
          type,
          value: url,
        } as MediaItem);
      }
    } catch (error) {
      console.error('Error processing media URL:', error);
      // Continue processing other matches
    }
  }

  return mediaItems;
}
