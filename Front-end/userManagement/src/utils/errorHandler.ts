import { AxiosError } from "axios"
import { showErrorToast } from "./customToast";

export const handleError = (error : unknown)=> {
    if(error instanceof AxiosError && error.response) {
        console.log(error.response.data.message);
        showErrorToast(error.response.data.message);
    }else {
        console.log("An unexprected error occured");
        showErrorToast("An error occured.")
    }
};