// Try the same-origin proxy first (avoids CORS on russ.cloud / russ.fm),
// then fall back to fetching the URL directly.
export const fetchWithProxyFallback = async (url: string) => {
  const proxiedResponse = await fetch(`/api/proxy?url=${encodeURIComponent(url)}`).catch(() => null);

  if (proxiedResponse?.ok) {
    return proxiedResponse;
  }

  return fetch(url);
};
