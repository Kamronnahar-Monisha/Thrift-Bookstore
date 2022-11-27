import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";

export const useLogOutTheUser = () => {
    const {logOut} = useContext(AuthContext);
    const logOutUser =()=>{
        logOut()
        .then(() => {
            localStorage.removeItem('accessToken');
        })
        .catch((error) => {
            console.error(error.massage);
        })
    }
    return logOutUser;
}