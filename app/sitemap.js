export default function sitemap() {
  const base = 'https://vedhanthitsolutions.com'; // update once domain is live
  const routes = ['', '/about', '/services', '/products', '/contact'];
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
}
