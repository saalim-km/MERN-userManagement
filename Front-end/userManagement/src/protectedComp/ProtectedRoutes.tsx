import { Navigate } from "react-router";


export const RootProtect = ({user , children}) => {
    return user ? children : <Navigate to='/login'/>
}

export const LoginProtect = ({user , children})=> {
    return !user ? children : <Navigate to="/"/>
}
