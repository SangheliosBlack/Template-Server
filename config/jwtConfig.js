require('dotenv').config();

module.exports = {
  secret: process.env.JWT_KEY,
  issuer: process.env.JWT_ISSUER,
  audience: process.env.JWT_AUDIENCE,
};
