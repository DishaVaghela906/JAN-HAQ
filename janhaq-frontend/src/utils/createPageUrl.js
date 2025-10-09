/**
 * Converts a page name into a lowercase URL path.
 * Example: "Explore" -> "/explore"
 * @param {string} page - Name of the page
 * @returns {string} - URL path
 */
export function createPageUrl(page) {
  if (!page || typeof page !== "string") return "/";
  return `/${page.trim().toLowerCase()}`;
}
