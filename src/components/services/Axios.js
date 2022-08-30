import axios from 'axios'; 
let axiosConfig = {
    baseURL: "https://abinsurancenode.salesdrive.app/sdx-api/secure/user/v2/",
    headers: {
        'Content-Type': 'application/json' ,
    }
}

const api = axios.create(axiosConfig);

export default api;