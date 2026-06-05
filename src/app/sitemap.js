export default async function sitemap() {
  const baseUrl = "https://evrehub.com";

  const routes = [
    "",
    "/about",
    "/services",
    "/advantages",
    "/calculator",
    "/reviews",
    "/contact",
    "/locator",
    "/charging",
    "/lounge",
    "/fleet",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  return routes;
}
