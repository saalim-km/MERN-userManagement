import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"


const RootStore = configureStore({
    reducer : {
        user : userReducer,
    },
})

export type RootState = ReturnType<typeof RootStore.getState>;
export default RootStore;