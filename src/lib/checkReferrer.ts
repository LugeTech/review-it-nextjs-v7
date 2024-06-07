export function checkReferer(referer: string, allowedDomains: string[]) {
  // Check if the referer is present and is one of the allowed domains
  if (!referer || !allowedDomains.includes(new URL(referer).origin)) {
    return false;
  }
  return true;
}
