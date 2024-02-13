import jwt from "jsonwebtoken";

export function encode(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24,
    algorithm: "HS256",
  });
}

export function decode(token) {
  return jwt.decode(token, process.env.JWT_SECRET);
}

export function check(token) {
  return jwt.verify(token, process.env.JWT_SECRET, { algorithms: ["HS256"] });
}
