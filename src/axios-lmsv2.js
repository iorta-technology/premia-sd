import axios from 'axios'; 
export const baseURL = 'https://sdtatadevlmsv2.iorta.in/secure/user/v2/';

let defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json' ,
}

const instance = axios.create({
    baseURL: baseURL,
    headers: defaultHeaders
});

export default instance;