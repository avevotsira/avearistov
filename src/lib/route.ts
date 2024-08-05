export function normalizeUrl(url: string): string {
  // Remove trailing slash if present
  let processedUrl = url.endsWith("/") ? url.slice(0, -1) : url;

  // Remove .html from the end if present
  processedUrl = processedUrl.replace(/\.html$/, "");

  return processedUrl;
}

