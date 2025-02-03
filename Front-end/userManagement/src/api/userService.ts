import  userAxiosInstance  from "../config/userAxiosinstance";
import { RegisterUser , loginUser } from "../interface/userInterface";
import { showErrorToast, showSuccessToast } from "../utils/customToast";

const userRegister = async(userData : RegisterUser) => {
    try {
        const res = await userAxiosInstance.post('/signup',userData);
        console.log("data vannu signup",res);
        console.log(`signup successfully ${res.data}`);
        showSuccessToast(res.data.message);
        return res.data;
    } catch (error : any) {
        console.log(error.response.data.message);
        showErrorToast(error.response.data.message)
    }
}

const userLogin = async(credentials : loginUser)=> {
    try {
        const res = await userAxiosInstance.post('/login',credentials);
        console.log("res data check",res)
        console.log(`login successfully ${res.data}`);
        return res.data;
    } catch (error : any) {
        console.log(error.response.data.message)
        showErrorToast(error.response.data.message)
    }
}


export {
    userRegister,
    userLogin
}