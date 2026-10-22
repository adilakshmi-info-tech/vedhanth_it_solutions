// Single source of truth for the public origin used in canonical URLs,
// Open Graph, sitemap and robots. Must match the host the site actually
// serves (www) so search engines index one address.
export const SITE_URL = 'https://www.vedhanthitsolutions.in';
export const SITE_NAME = 'Vedhanth IT Solutions';

export const BUSINESS = {
  phones: ['+919901975647', '+919740005741'],
  email: 'sales@vedhanthitsolutions.in',
  locality: 'Mudalapalya',
  region: 'Karnataka',
  city: 'Bengaluru',
  country: 'IN',
};

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString();
}
