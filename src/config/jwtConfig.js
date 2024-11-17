import dotenv from "dotenv";

dotenv.config();

export default  {
  secret: process.env.JWT_KEY,
  issuer: process.env.JWT_ISSUER,
  audience: process.env.JWT_AUDIENCE,
};
