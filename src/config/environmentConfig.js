import dotenv from 'dotenv'

dotenv.config();

export default {
  environment: process.env.NODE_ENV,
  apiVersion: process.env.API_VERSION,
};
