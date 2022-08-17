import axios from 'axios'; 
let axiosConfig = {
    baseURL: "https://sdrestnode.iorta.in/secure/sd/",
    headers: {
        'Content-Type': 'application/json' ,
    }
}

const api = axios.create(axiosConfig);

export default api;