import { useContext } from "react"
import { Store } from "../Store"
import { Navigate } from "react-router-dom";

export default function ModerRoute({children}){
    const {state} = useContext(Store);
    const {userInfo} = state;
    const hasAccess = userInfo && (userInfo.isModer || userInfo.isAdmin);
    return hasAccess ? children : <Navigate to='/signin'/>
}