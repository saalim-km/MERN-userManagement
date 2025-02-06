import React from "react";
import { Navigate } from "react-router";

 
interface UserProtectProps {
    user : boolean,
    children : React.ReactNode
}

interface AdminProtectProps {
    admin : boolean,
    children : React.ReactNode
}

export const RootProtect : React.FC<UserProtectProps>= ({user , children}) => {
    return user ? children : <Navigate to='/login'/>
}

export const LoginProtect : React.FC<UserProtectProps> = ({user , children})=> {
    return !user ? children : <Navigate to="/"/>
}


export const AdminLogin : React.FC<AdminProtectProps>  = ({admin , children})=> {
    return !admin ? children : <Navigate to="/admin"/>
}


export const AdminProtectRoute : React.FC<AdminProtectProps> = ({admin , children})=> {
    return admin ? children : <Navigate to={"/admin-login"}/>
}