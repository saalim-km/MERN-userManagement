import {userAxiosInstance} from "../config/axiosInstance";
import {
  RegisterUser,
  UpdateUser,
  loginUser,
} from "../interface/userInterface";


import { showSuccessToast } from "../utils/customToast";
import {cloudAxiosInstance} from "../config/axiosInstance";
import { handleError } from "../utils/errorHandler";

const userRegister = async (userData: RegisterUser) => {
  try {
    const res = await userAxiosInstance.post("/signup", userData);
    console.log(res);
    console.log(res.data.message);

    showSuccessToast(res.data.message);
    return res.data.success;
  } catch (error: unknown) {
    handleError(error);
  }
};

const userLogin = async (credentials: loginUser) => {
  try {
    const res = await userAxiosInstance.post("/login", credentials);
    console.log("res data check", res);
    console.log(`login successfully ${res.data}`);

    const { access, refresh } = res.data.token;
    localStorage.setItem("userAccess", access);
    localStorage.setItem("userRefresh", refresh);
    return res.data;
  } catch (error: unknown) {
    handleError(error);
  }
};

const uploadImage = async (formData: FormData) => {
  try {
    const imageUrl = await cloudAxiosInstance.post("/upload", formData);
    console.log("image url created : ", imageUrl);
    return imageUrl.data.url;
  } catch (error: unknown) {
    handleError(error);
  }
};

const updateUserProfile = async (userData: Partial<UpdateUser>) => {
  try {
    console.log("update user profile api")
    const res = await userAxiosInstance.post("/update", userData);
    console.log("user update aaayi : ",res)

    const newData = {
      userName : res.data.user.name,
      profileImg : res.data.user.profileImage,
      email : res.data.user.email
    }

    console.log(newData)
    showSuccessToast("Profile updated.")
    return newData;
  } catch (error) {
    handleError(error);
  }
};



export { userRegister, userLogin, uploadImage, updateUserProfile };
