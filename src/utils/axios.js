import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://lwsjson.herokuapp.com",
});

export default axiosInstance;
