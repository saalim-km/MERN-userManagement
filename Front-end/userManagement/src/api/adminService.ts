import {adminAxiosInstance} from "../config/axiosInstance";
import { RegisterUser } from "../interface/userInterface";
import { showSuccessToast } from "../utils/customToast";
import { handleError } from "../utils/errorHandler"

export const adminLogin = async(email : string , password : string)=> {
    try {
        console.log("data admin login kitti")
        console.log(email , password);
        const data = {
            email : email,
            password : password
        }

        const res = await adminAxiosInstance.post("/login",data);
        console.log(res);

        localStorage.setItem("adminAccess",res.data.token.access)
        localStorage.setItem("adminRefresh",res.data.token.refresh)
        showSuccessToast(res.data.message)
        return res.data.user;
    } catch (error) {
        handleError(error);
    }
}

export const addUser = async(userData : RegisterUser)=> {
    try {
        console.log("user data api service : ",userData);
    } catch (error) {
        handleError(error);
    }
}


// for fetching all users exept admin
export const fetchUsers = async () => {
    try {
        const response = await adminAxiosInstance.get("/users");
        console.log(response)
        return response.data
    } catch (error) {
        handleError(error);
    }
};

// for fetching single user
export const fetchUser = async(userId : string)=> {
    try {
        const res = await adminAxiosInstance.get(`/user/${userId}`);
        console.log(res);
        return res.data.user;
    } catch (error) {
        handleError(error);
    }
}

export const editUser = async(userData , userid) => {
    try {
        const res = await adminAxiosInstance.put(`/user/${userid}`,userData);
        console.log(res)
        showSuccessToast(res.data.message);
        return res.data;    
    } catch (error) {
        handleError(error);
    }
}

export const deleteUser = async(userId)=> {
    try {
        const res = await adminAxiosInstance.delete(`/user/${userId}`)
        console.log("res from deleteuser : ",res);
        showSuccessToast(res.data.message)
        return res.data.users;
    } catch (error) {
        handleError(error)
    }
}