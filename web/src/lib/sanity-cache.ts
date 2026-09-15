const CACHE_TTL_MS = 10_000;
const cache = new Map<string, { expiresAt: number; promise: Promise<unknown> }>();

export function cachedSanityQuery<T>(key: string, query: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const hit = cache.get(key);

  if (hit && hit.expiresAt > now) {
    return hit.promise as Promise<T>;
  }

  const promise = query();
  cache.set(key, { expiresAt: now + CACHE_TTL_MS, promise });
  setTimeout(() => {
    const entry = cache.get(key);
    if (entry && entry.expiresAt <= Date.now()) {
      cache.delete(key);
    }
  }, CACHE_TTL_MS);
  return promise;
}
