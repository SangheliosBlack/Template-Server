import axios from 'axios';

const axiosSmsInstance = axios.create({
  baseURL: process.env.LABS_MOBILE_URL, 
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + Buffer.from(`${process.env.LABS_MOBILE_USER_NAME}:${process.env.LABS_MOBILE_TOKEN_API}`).toString('base64')
  },
  maxBodyLength: Infinity,
});

axiosSmsInstance.interceptors.response.use(
  response => response.data, 
  error => {
    console.error('Axios Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosSmsInstance;
