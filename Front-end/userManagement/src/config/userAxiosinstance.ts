import axios from 'axios'

const userAxiosInstance = axios.create({
    baseURL: "http://localhost:3006/user",
    withCredentials: true
})

userAxiosInstance.interceptors.request.use((res)=> res , (err)=> {
    console.log("intercept punda",err);
    return Promise.reject(({
        response : {
            status : 500,
            data : {
                message : "oombi"
            }
        }
    }))
},
)



export default userAxiosInstance;