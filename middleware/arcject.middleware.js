import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });
    if (decision.isDenied()) {
      // If the request is denied, respond with an error
      if (decision.reason.isBot()) {
        return res.status(403).json({
          success: false,
          message: "Access denied for bots",
          details: decision.reason,
        });
      }
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          success: false,
          message: "Rate limit exceeded",
          details: decision.reason,
        });
      }
      return res.status(403).json({
        success: false,
        message: "Access denied by Arcjet",
        details: decision.reason,
      });
    }
    next();
  } catch (error) {
    console.log("Arcjet Middleware Error:", error);
    next(error);
  }
};
export default arcjetMiddleware;
