const ApiError = require("../utils/ApiError");

/**
 * Zod validation middleware factory
 * @param {import("zod").ZodSchema} schema - Zod schema to validate against
 * @param {"body"|"query"|"params"} source - Which part of req to validate
 */
const validate = (schema, source = "body") => (req, _res, next) => {
  const result = schema.safeParse(req[source]);

  if (!result.success) {
    const errors = result.error.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
    return next(new ApiError(422, "Validation failed.", errors));
  }

  // Attach parsed (and coerced) data back to req
  req[source] = result.data;
  next();
};

module.exports = validate;
