import { createSlice } from "@reduxjs/toolkit";


const storedUser = localStorage.getItem("user");
const storedAuth = localStorage.getItem("isAuth");


const initalState = {
    user :  storedUser ? JSON.parse(storedUser) : null,
    isAuthenticated: storedAuth ? JSON.parse(storedAuth) : false
}

const userSlice = createSlice({
    name : "user",
    initialState : initalState,
    reducers : {
        login : (state,action)=> {
            state.user = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem("user",JSON.stringify(state.user));
            localStorage.setItem("isAuth",JSON.stringify(true));
        },
        logout : (state )=> {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("user");
            localStorage.removeItem("isAuth");
            localStorage.removeItem('access');
            localStorage.removeItem("refresh");
        }
    }
})


const {login , logout} = userSlice.actions;

export  {
    login , logout
}
export default userSlice.reducer;