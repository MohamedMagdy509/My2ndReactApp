import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectRoute(props) {
        if(props.userData === ""){
            return <Navigate to="/login"/>
        }
        else{
            return props.children
        }
    
}
