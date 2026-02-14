// middleware/rateLimiter.js

export function rateLimiter({ windowMs = 60000, limit = 100 } = {}) {
  const store = new Map();

  // Periodic cleanup to prevent memory leaks
  setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of store.entries()) {
      if (now > entry.resetTime) {
        store.delete(ip);
      }
    }
  }, windowMs);

  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();

    let entry = store.get(ip);

    // First request from this IP
    if (!entry) {
      store.set(ip, {
        count: 1,
        resetTime: now + windowMs
      });

      res.setHeader("X-RateLimit-Limit", limit);
      res.setHeader("X-RateLimit-Remaining", limit - 1);
      res.setHeader("X-RateLimit-Reset", now + windowMs);

      return next();
    }

    // Window expired → reset counter
    if (now > entry.resetTime) {
      entry.count = 1;
      entry.resetTime = now + windowMs;

      res.setHeader("X-RateLimit-Limit", limit);
      res.setHeader("X-RateLimit-Remaining", limit - 1);
      res.setHeader("X-RateLimit-Reset", entry.resetTime);

      return next();
    }

    // Increment count
    entry.count++;

    // Too many requests
    if (entry.count > limit) {
      res.setHeader("Retry-After", Math.ceil((entry.resetTime - now) / 1000));
      return res.status(429).json({ message: "Too many requests" });
    }

    // Set helpful headers
    res.setHeader("X-RateLimit-Limit", limit);
    res.setHeader("X-RateLimit-Remaining", limit - entry.count);
    res.setHeader("X-RateLimit-Reset", entry.resetTime);

    next();
  };
}
