const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./secret-token");

exports.createToken = (payload, time) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: time }); //sona erme süresi
};
