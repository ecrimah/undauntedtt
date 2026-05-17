/**
 * Simple client-side data cache to avoid re-fetching from Supabase
 * on every page navigation. Data is cached in memory for a configurable TTL.
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<any>>();

const DEFAULT_TTL = 10 * 60 * 1000; // 10 minutes — reduce re-fetches during browsing

/**
 * Heuristic for "do not cache this result" — used to avoid poisoning the
 * cache with errors or empty paginated lists that often come from a
 * transient RLS / network failure.
 */
function shouldSkipCaching(value: unknown): boolean {
  if (!value || typeof value !== 'object') return false;
  const v = value as { error?: unknown; data?: unknown };
  if (v.error) return true;
  // PostgREST-style result: { data: [], count: 0, error: null }
  if (Array.isArray(v.data) && v.data.length === 0) return true;
  return false;
}

/**
 * Get data from cache or fetch it fresh.
 * Errors and empty result sets are NOT cached so that a transient failure
 * (e.g. RLS misconfiguration or network blip) can recover on the next call.
 */
export async function cachedQuery<T>(
  key: string,
  queryFn: () => Promise<T>,
  ttlMs: number = DEFAULT_TTL
): Promise<T> {
  const cached = cache.get(key);

  if (cached && (Date.now() - cached.timestamp) < ttlMs) {
    return cached.data;
  }

  const data = await queryFn();

  if (!shouldSkipCaching(data)) {
    cache.set(key, { data, timestamp: Date.now() });
  }
  return data;
}

/**
 * Invalidate a specific cache key
 */
export function invalidateCache(key: string) {
  cache.delete(key);
}

/**
 * Invalidate all cache keys matching a prefix
 */
export function invalidateCachePrefix(prefix: string) {
  for (const key of cache.keys()) {
    if (key.startsWith(prefix)) {
      cache.delete(key);
    }
  }
}

/**
 * Clear the entire cache
 */
export function clearCache() {
  cache.clear();
}
