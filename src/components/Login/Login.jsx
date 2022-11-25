import axios from 'axios';
import joi from 'joi';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from "./Login.module.scss"
import logoImg from "../../assets/images/logo.png"
import { AuthContext } from '../../AuthContext';

export default function Login() {
    let {saveUserData,userData} = useContext(AuthContext);
    const [apiMessage, setApiMessage] = useState("");
    const [myUserValErrors, setMyUserValErrors] = useState([]);
    useEffect(() => {
        if(userData !==null)
        changePage("/My2ndReactApp/home");
    }, [userData]);
let changePage = useNavigate();

    const [myUser, setMyUser] = useState({
        "email":"",
        "password":"",
    });

    let updateMyUser =(e)=>{
        let MyUser = {...myUser};
        MyUser[e.target.name]=e.target.value;
        setMyUser(MyUser);
    }


    let sendToApi =async(e)=>{
        e.preventDefault();
        let userValid = verifyMyUser();
        if(userValid.error){
            setApiMessage("");
            setMyUserValErrors(userValid.error.details);
        }
        else{
            setMyUserValErrors([]);
            let {data} = await axios.post("https://route-egypt-api.herokuapp.com/signin",myUser);
            if(data.message === 'success'){
                localStorage.setItem("token",data.token);
                saveUserData();
                changePage("/My2ndReactApp/home");
            }
            else{
                setApiMessage(data.message);
            }
        }
    }

    let verifyMyUser =()=>{
        const schema =joi.object({
            email: joi.string().email({tlds:{allow:['com','net','io','me']}}).required(),
            password:joi.string().min(8).max(14),
        });

        return schema.validate(myUser,{abortEarly:false}) //return schema.validate({first_name:myUser.first_name},{abortEarly:false}) for single check
    }

    let makeNewMail =()=>{
        alert("Please make a new account");
    }

    return (
        <>
            <div className="container px-5 overflow-auto">
            <div className="row mt-5">
                <div className={`col-md-6 ${styles.regImg}`}>
                </div>
                <div className={`col-md-6 ${styles.bgGray}`}>
                    <div className="container py-4 text-center">
                        <img src={logoImg} alt="" className='w-25'/>
                        <h2 className='text-center fs-3 mt-2'>Log in to GameOver</h2>
                        {apiMessage?<p className='alert alert-danger'>{apiMessage}</p>:""}
                        {myUserValErrors.map((myUserValError,index)=><p className='alert alert-danger' key={index}>{myUserValError.message}</p>)}
                    <form onSubmit={sendToApi} className='container px-4'>
                        
                        <input onChange={updateMyUser} type="email" name="email" placeholder='Email Address' className='form-control border-0 py-2 my-4'/>
                        <input onChange={updateMyUser} type="password" name="password" placeholder='Password' className='form-control border-0 py-2 my-4'/>
                        <button className={`btn btn-primary w-100 py-2 ${styles.formBtn}`}>Login</button>
                    </form>
                    <hr />
                    <Link className='text-decoration-none text-primary' onClick={makeNewMail}>Forgot Password?</Link>
                    <p className='text-muted'>Not a member yet? <Link className='text-decoration-none text-primary' to="register">Create Account<i _ngcontent-yft-c22="" className="fas fa-chevron-right small"></i></Link></p>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}
