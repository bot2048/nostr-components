/**
 * HTML sanitization utilities to prevent XSS attacks
 */

/**
 * Sanitizes HTML content to prevent XSS attacks
 * Removes potentially dangerous tags and attributes
 * @param html The HTML string to sanitize
 * @returns Safe HTML string
 */
export function sanitizeHtml(html: string): string {
  if (!html) return '';
  
  // Create a DOM parser and a document to work with
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  // Remove dangerous tags
  const dangerousTags = ['script', 'iframe', 'object', 'embed', 'base', 'form'];
  dangerousTags.forEach(tagName => {
    const elements = doc.querySelectorAll(tagName);
    elements.forEach(el => el.remove());
  });
  
  // Remove all inline event handlers and suspicious attributes
  const allElements = doc.querySelectorAll('*');
  allElements.forEach(el => {
    const attributes = Array.from(el.attributes);
    attributes.forEach(attr => {
      // Remove event handlers (on*)  
      if (attr.name.toLowerCase().startsWith('on')) {
        el.removeAttribute(attr.name);
      }
      
      // Remove javascript: URLs
      if ((attr.name === 'href' || attr.name === 'src' || 
           attr.name === 'action' || attr.name.startsWith('data-')) && 
          attr.value.toLowerCase().includes('javascript:')) {
        el.removeAttribute(attr.name);
      }
      
      // Remove expression/behavior in CSS
      if (attr.name === 'style') {
        if (attr.value.toLowerCase().includes('expression') || 
            attr.value.toLowerCase().includes('behavior') ||
            attr.value.toLowerCase().includes('url(javascript:')) {
          el.removeAttribute('style');
        }
      }
    });
  });
  
  // Sanitize inline CSS to prevent CSS-based attacks
  const styles = doc.querySelectorAll('style');
  styles.forEach(style => {
    if (style.textContent && 
        (style.textContent.includes('expression') || 
         style.textContent.includes('behavior') ||
         style.textContent.includes('javascript:'))) {
      style.remove();
    }
  });
  
  // Convert back to string - get the body content (skip html/head/body tags)
  return doc.body.innerHTML;
}

/**
 * Sanitizes a text content string to ensure it's safe for insertion into HTML
 * @param text The text to sanitize
 * @returns Safe text string with HTML special chars escaped
 */
export function sanitizeText(text: string): string {
  if (!text) return '';
  
  // Replace HTML special characters with their entity equivalents
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
