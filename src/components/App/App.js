import React, { useContext } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Games from '../All/Games'
import Details from '../Details/Details'
import Home from '../Home/Home'
import Login from '../Login/Login'
import MasterLayout from '../MasterLayout/MasterLayout'
import Register from '../Register/Register'
import ProtectRoute from '../ProtectRoute/ProtectRoute'
import { AuthContext } from '../../AuthContext'
import ErrorPage from '../ErrorPage/ErrorPage'


export default function App() {
  let {userData,setUserData}=useContext(AuthContext);

  let logOutUser = () => {
    localStorage.removeItem("token");
    setUserData(null);
}

  let routes = createBrowserRouter([
    {
      path: '/My2ndReactApp', element: <MasterLayout logOutUser={logOutUser}/>,errorElement:<ErrorPage/>, children: [
        { index: true, element: <ProtectRoute userData={userData}><Home /></ProtectRoute> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'home', element: <ProtectRoute userData={userData}><Home /></ProtectRoute>},
        { path: 'games/:type/:of', element: <ProtectRoute userData={userData}><Games /></ProtectRoute> },
        { path: 'details/:type/:of', element: <ProtectRoute userData={userData}><Details /></ProtectRoute>},
      ]
    }
  ])
  return (
    <RouterProvider router={routes} />
  )
}
