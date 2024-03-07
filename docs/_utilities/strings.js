import slugify from 'slugify';

/** Creates a slug from an arbitrary string of text. */
export function createSlug(text) {
  return slugify(String(text), {
    remove: /[^\w|\s]/g,
    lower: true
  });
}

/** Determines whether or not a link is external. */
export function isExternalLink(link) {
  // We use the "internal" hostname when initializing JSDOM so we know that those are local links
  if (!link.hostname) return false;
  return true;
}
