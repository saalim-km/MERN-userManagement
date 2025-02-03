import { createSlice } from "@reduxjs/toolkit";

const initalState = {
    user :  null,
    isAuthenticated: false
}

const userSlice = createSlice({
    name : "user",
    initialState : initalState,
    reducers : {
        login : (state,action)=> {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout : (state )=> {
            state.user = null;
            state.isAuthenticated = false;
        }
    }
})


const {login , logout} = userSlice.actions;

export  {
    login , logout
}
export default userSlice.reducer;