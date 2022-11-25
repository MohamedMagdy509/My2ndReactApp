import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";


export let AuthContext = createContext(null);

export function AuthContextProvider(props) {
    let [userData, setUserData] = useState("");
    useEffect(() => {
        if (localStorage.getItem("token")) {
            saveUserData();
        }
        else{
            setUserData("");
        }
    }, []);
    

    let saveUserData = () => {
        let encodedData = localStorage.getItem("token");
        let decodedData = jwtDecode(encodedData);
        setUserData(decodedData);
    }

    return <AuthContext.Provider value={{userData,setUserData,saveUserData}}>
        {props.children}
    </AuthContext.Provider>

}
