import axios, { InternalAxiosRequestConfig, isAxiosError } from "axios";

const adminAxiosInstance = axios.create({
    baseURL : import.meta.env.VITE_API_ADMIN_URL,
})

const cloudAxiosInstance = axios.create({
    baseURL : import.meta.env.VITE_CLOUDINARY_API,
})

const userAxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})


const newAccessToken = async()=> {
    try {
        console.log("new access token api")
        const refreshToken = localStorage.getItem("adminRefresh");
        console.log("admin refresh token from local storage",refreshToken);
        const data = {
            refreshToken : refreshToken
        }
        console.log(data)
        const newToken = await adminAxiosInstance.post('/auth/refresh',data);
        console.log("new access token ",newToken.data);

        localStorage.setItem("adminAccess",newToken.data.token);
        console.log(localStorage.getItem("after setting access token after expired : "))
        return newToken.data.token;
    } catch (error) {
        console.log(error)
    }
}


adminAxiosInstance.interceptors.request.use(
    (config : InternalAxiosRequestConfig)=> {
        const refreshToken = localStorage.getItem("adminRefresh")
        const accessToken = localStorage.getItem("adminAccess");
        console.log("admin refresh token from local storage : ", refreshToken);
        console.log("admin accss token from local storage : ",accessToken);

        if(accessToken) {
            config.headers = config.headers || {};
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error : unknown)=> {
        if(isAxiosError(error)){
            Promise.reject(error);
        }
    }
)


adminAxiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && error.response?.data?.message === "Access token expired") {
            try {
                const accessToken = await newAccessToken();
                console.log("access token", accessToken);

                if (accessToken) {
                    originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
                    // once more send request with new access token !!
                    return adminAxiosInstance(originalRequest);
                }
            } catch (error: unknown) {
                if (isAxiosError(error) && error.response) {
                    console.log(error.response.data.message);
                } else {
                    console.log("An unexpected error occurred");
                }
            }
        }

        return Promise.reject(error);
    }
);

export {
    adminAxiosInstance,
    userAxiosInstance,
    cloudAxiosInstance
}

