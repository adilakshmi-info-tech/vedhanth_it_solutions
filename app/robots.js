export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: 'https://vedhanthitsolutions.in/sitemap.xml', // update once domain is live
  };
}
