/**
 * Wraps an async route handler — eliminates try/catch boilerplate
 * @param  {Function} fn - async Express route handler
 * @returns Express middleware
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
