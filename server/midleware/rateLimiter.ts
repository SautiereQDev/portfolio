import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 60 * 1000, // 15 minutes
  max: 5, // 5 requêtes max par IP
  message: "Trop de tentatives, veuillez réessayer plus tard",
});
