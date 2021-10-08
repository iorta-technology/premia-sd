import axios from 'axios'; 
export const baseURL = 'https://pocbancanode.iorta.in/secure/user/';

let defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json' ,
}

const instance = axios.create({
    baseURL: baseURL,
    headers: defaultHeaders
});

export default instance;