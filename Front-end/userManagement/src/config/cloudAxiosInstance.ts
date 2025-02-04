import axios from "axios";

const cloudAxiosInstance = axios.create({
    baseURL : import.meta.env.VITE_CLOUDINARY_API,
})

export default cloudAxiosInstance;