export default function sitemap() {
  const base = 'https://vedhanthitsolutions.in'; // update once domain is live
  const routes = ['', '/about', '/services', '/amc', '/products', '/contact'];
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
}
