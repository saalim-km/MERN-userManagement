import React from "react";
import { Navigate } from "react-router";

 
interface ProtectProps {
    user : boolean,
    children : React.ReactNode
}


export const RootProtect : React.FC<ProtectProps>= ({user , children}) => {
    return user ? children : <Navigate to='/login'/>
}

export const LoginProtect : React.FC<ProtectProps> = ({user , children})=> {
    return !user ? children : <Navigate to="/"/>
}
