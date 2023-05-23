import axios from "axios";

const axiosInstance = axios.create({ baseURL: " https://json-server-vercel-sand-six.vercel.app/" });

export default axiosInstance;
