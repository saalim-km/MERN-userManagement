import axios, { InternalAxiosRequestConfig, isAxiosError } from 'axios'

const userAxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})


const newAccessToken = async()=> {
    try {
        const refreshToken = localStorage.getItem("refresh");
        console.log("refresh token from local storage",refreshToken);

        const newToken = await userAxiosInstance.post('/auth/refresh',refreshToken);
        console.log("new access token ",newToken);
        return newToken;
    } catch (error) {
        console.log(error)
    }
}

userAxiosInstance.interceptors.request.use(
    async (config : InternalAxiosRequestConfig)=> {
        const refreshToken = localStorage.getItem("refresh");
        const accessToken = localStorage.getItem("access");

        if(accessToken){
            config.headers = config.headers || {};
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        if (refreshToken) {
            config.headers = config.headers || {};
            config.headers["x-refresh-token"] = refreshToken;
        }
        return config;
    },
    (error: unknown)=> {
        if(isAxiosError(error)) {
            Promise.reject(error)
        }
    }
);

userAxiosInstance.interceptors.response.use(
    (response)=> response,
    async (error)=> {
        const originalRequest = error.config;
        console.log("hi hoooy",error)
        if(error?.status == 401 && !originalRequest._retry &&error.response?.data?.message == "Access token expired"){
            originalRequest._retry = true;

            try {
                console.log("jwt expire aayi ")
                const accessToken = await newAccessToken();
                console.log("accesstoken",accessToken);
            } catch (error : unknown) {
                if(isAxiosError(error) && error.response) {
                    console.log(error.response.data.message)
                }
            }
        }

        return Promise.reject(error);
    }
)


export default userAxiosInstance;