import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_local_dev";

/**
 * Generate a JWT token for a user
 * @param {object} user - User object containing _id, name, email, role, avatar
 * @returns {string} Signed JWT token
 */
export function generateToken(user) {
  return jwt.sign(
    {
      id: user._id || user.id,
      name: user.name,
      email: user.email,
      role: user.role || "user",
      avatar: user.avatar || "",
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

/**
 * Verify a JWT from Next.js request headers
 * @param {Request} request - Next.js request object
 * @returns {object|null} Decoded user payload if valid, otherwise null
 */
export function verifyToken(request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }
    const token = authHeader.split(" ")[1];
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error("JWT Verification failed:", error.message);
    return null;
  }
}

// In-memory cache for rate limiting
const rateLimitCache = new Map();

/**
 * Lightweight in-memory rate limiter helper
 * @param {string} key - Unique key for tracking (e.g. IP + endpoint)
 * @param {number} limit - Maximum number of requests allowed in window
 * @param {number} windowMs - Time window in milliseconds
 * @returns {object} Rate limit status { ok, remaining, resetTime }
 */
export function rateLimit(key, limit = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  
  // Clean up old expired entries from other keys occasionally
  if (Math.random() < 0.05) {
    for (const [cacheKey, timestamps] of rateLimitCache.entries()) {
      const active = timestamps.filter(t => now - t < windowMs);
      if (active.length === 0) {
        rateLimitCache.delete(cacheKey);
      } else {
        rateLimitCache.set(cacheKey, active);
      }
    }
  }

  if (!rateLimitCache.has(key)) {
    rateLimitCache.set(key, [now]);
    return { ok: true, remaining: limit - 1, resetTime: now + windowMs };
  }

  const timestamps = rateLimitCache.get(key).filter(t => now - t < windowMs);
  if (timestamps.length >= limit) {
    const oldestTimestamp = timestamps[0];
    return { ok: false, remaining: 0, resetTime: oldestTimestamp + windowMs };
  }

  timestamps.push(now);
  rateLimitCache.set(key, timestamps);
  return { ok: true, remaining: limit - timestamps.length, resetTime: now + windowMs };
}
