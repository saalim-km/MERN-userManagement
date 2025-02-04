import axios from 'axios'

const userAxiosInstance = axios.create({
    baseURL: "http://localhost:3006/user",
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
    async (config : any)=> {
        const refreshToken = localStorage.getItem("refresh");
        const accessToken = localStorage.getItem("access");

        if(accessToken){
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        if (refreshToken) {
            config.headers["x-refresh-token"] = refreshToken;  // Send refresh token in a custom header
        
        }
        return config;
    },
    (error: any)=> Promise.reject(error)
);

userAxiosInstance.interceptors.response.use(
    (response)=> response,
    async (error)=> {
        const originalRequest = error.config;

        if(error.response?.status == 401 && originalRequest._retry){
            originalRequest._retry = true;

            try {
                const accessToken = await newAccessToken();
                console.log("accesstoken",accessToken);
            } catch (error : any) {
                console.log(error.response.data.message)
            }
        }

        return error;
    }
)


export default userAxiosInstance;