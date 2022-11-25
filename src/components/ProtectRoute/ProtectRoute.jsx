import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectRoute(props) {
        if(props.userData === "" || localStorage.getItem("token")===null){
            return <Navigate to="/login"/>
        }
        else{
            return props.children
        }
    
}
