import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://192.168.1.109:3000/api',
    withCredentials: true, // If you need to send credentials
});

export default axiosInstance;
