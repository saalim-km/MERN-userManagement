import userAxiosInstance from "../config/userAxiosinstance";
import {
  RegisterUser,
  UpdateUser,
  loginUser,
} from "../interface/userInterface";
import { showSuccessToast } from "../utils/customToast";
import cloudAxiosInstance from "../config/cloudAxiosInstance";
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
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
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
    const res = await userAxiosInstance.post("/update", userData);
  } catch (error) {
    handleError(error);
  }
};
export { userRegister, userLogin, uploadImage, updateUserProfile };
