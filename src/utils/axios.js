import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://lws-mabuhanifa.herokuapp.com",
});

export default axiosInstance;
