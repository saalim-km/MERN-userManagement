import  userAxiosInstance  from "../config/userAxiosinstance";
import { RegisterUser , loginUser } from "../interface/userInterface";
import { showErrorToast, showSuccessToast } from "../utils/customToast";

const userRegister = async(userData : RegisterUser) => {
    try {
        const res = await userAxiosInstance.post('/signup',userData);
        console.log(res);
        if(res.response) {
            if(!res.response.data.success) {
                console.log(res?.response.data.message);
                return showErrorToast(res?.response.data.message);
            }
        }

        console.log(res.data);
        showSuccessToast(res.data.message);
        return res.data.success;
    } catch (error : any) {
        console.log(error.response.data.message);
        showErrorToast(error.response.data.message)
    }
}

const userLogin = async(credentials : loginUser)=> {
    try {
        const res = await userAxiosInstance.post('/login',credentials);
        if(!res.response.data.success){
            console.log(res.response.data.success)
            showErrorToast(res.response.data.message)
            return;
        }
        console.log("res data check",res)
        console.log(`login successfully ${res.data}`);
        
        const {access , refresh} = res.data.token;
        localStorage.setItem("access",access);
        localStorage.setItem("refresh",refresh);
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