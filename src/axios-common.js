import axios from 'axios'; 
export const baseURL = 'https://sdrestnode.iorta.in/secure/sd/user/v2/';

let defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json' ,
}

const instance = axios.create({
    baseURL: baseURL,
    headers: defaultHeaders
});

export default instance;