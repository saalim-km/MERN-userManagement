import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import adminSlice from "./adminSlice";



const RootStore = configureStore({
    reducer : {
        user : userReducer,
        admin : adminSlice
    },
})

export type RootState = ReturnType<typeof RootStore.getState>;
export default RootStore;