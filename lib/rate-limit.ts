type Entry = {
  count: number;
  expiresAt: number;
};

const store = new Map<string, Entry>();

export function rateLimit(key: string, limit = 10, windowMs = 60_000) {
  const now = Date.now();
  const record = store.get(key);

  if (!record || record.expiresAt < now) {
    store.set(key, { count: 1, expiresAt: now + windowMs });
    return { success: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { success: false, remaining: 0 };
  }

  record.count += 1;
  store.set(key, record);

  return { success: true, remaining: Math.max(0, limit - record.count) };
}
