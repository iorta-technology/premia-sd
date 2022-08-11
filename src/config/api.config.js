// const NODE_ENV = 'production';
const NODE_ENV = 'development';
const DEV_BASE_URL = 'https://abinsurancenode.salesdrive.app/sdx-api/';
const PROD_BASE_URL = ''; // WE WILL ADD LATER
export default {
  baseURL: NODE_ENV === 'development' ? DEV_BASE_URL : PROD_BASE_URL,
  auth: 'auth/',
  secure: 'secure/',
  NODE_ENV: NODE_ENV
};