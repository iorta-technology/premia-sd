// const NODE_ENV = 'production';
const NODE_ENV = 'uat';
// const NODE_ENV = 'development';

const DEV_BASE_URL = 'https://b2bnodedev.salesdrive.app/b2b/';
const UAT_BASE_URL = 'https://b2bnodeuat.salesdrive.app/b2b/'; // WE WILL ADD LATER
const PROD_BASE_URL = 'https://b2bnode.iorta.in/b2b/'; // WE WILL ADD LATER

const _config = {
  baseURL: NODE_ENV === 'development' ? DEV_BASE_URL : NODE_ENV === 'uat' ? UAT_BASE_URL : PROD_BASE_URL,
  // baseURL: NODE_ENV === 'development' ? DEV_BASE_URL : PROD_BASE_URL,
  // baseURL: UAT_BASE_URL,
  auth: 'auth/',
  secure: 'secure/',
  NODE_ENV: NODE_ENV
}

export default _config;