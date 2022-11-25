import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

export default function MasterLayout({logOutUser}) {
    return (
        <div className='overflow-auto'>
            <Navbar logOutUser={logOutUser}/>
            <div className="div mt-2 overflow-auto">
            <div className="div mt-5">
            <Outlet ></Outlet>
            </div>
            </div>
        </div>
    )
}
