import axios from 'axios';
import joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from "./Register.module.scss"

export default function Register() {
    const [apiMessage, setApiMessage] = useState("");
    const [myUserValErrors, setMyUserValErrors] = useState([]);

    let changePage = useNavigate();
    let goToLogin = ()=>{
        changePage("/");
    }
    const [myUser, setMyUser] = useState({
        "first_name":"",
        "last_name":"",
        "email":"",
        "password":"",
        "age":"",
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
            let {data} = await axios.post("https://route-egypt-api.herokuapp.com/signup",myUser);
            if(data.message === 'success'){
                goToLogin();
            }
            else{
                setApiMessage(data.message);
            }
        }
    }

    let verifyMyUser =()=>{
        const schema =joi.object({
            first_name: joi.string().alphanum().min(2).max(20).regex(/^[a-z,A-Z]+$/).required(), //regex == use pattern(new RegExp(/^[a-z,A-Z]+$/))
            last_name: joi.string().alphanum().min(2).max(20).pattern(new RegExp(/^[a-z,A-Z]+$/)).required(),
            age: joi.number().min(2).max(99).required(),
            email: joi.string().email({tlds:{allow:['com','net','io','me']}}).required(),
            password:joi.string().min(8).max(14),
        });

        return schema.validate(myUser,{abortEarly:false}) //return schema.validate({first_name:myUser.first_name},{abortEarly:false}) for single check
    }


    return (
        <>
            <div className="container p-5">
            <div className="row my-4">
                <div className={`col-md-6 ${styles.regImg}`}>
                </div>
                <div className={`col-md-6 ${styles.bgGray}`}>
                    <div className="container py-4 ">
                        <h2 className='text-center fs-3 mt-2'>Create My Account!</h2>
                        {apiMessage?<p className='alert alert-danger'>{apiMessage}</p>:""}
                        {myUserValErrors.map((myUserValError,index)=><p className='alert alert-danger' key={index}>{myUserValError.message}</p>)}
                    <form onSubmit={sendToApi}>
                        <div className="row">
                            <div className="col-sm-6"><input onChange={updateMyUser} type="text" name='first_name' placeholder='First Name' className='form-control bg-dark border-0 text-white mt-3'/></div>
                            <div className="col-sm-6"><input onChange={updateMyUser} type="text" name='last_name' placeholder='Last Name' className='form-control bg-dark border-0 text-white mt-3'/></div>
                        </div>
                        <input onChange={updateMyUser} type="email" name="email" placeholder='Email Address' className='form-control bg-dark border-0 text-white my-3'/>
                        <input onChange={updateMyUser} type="number" name="age" placeholder='Age' className='form-control bg-dark border-0 text-white my-3'/>
                        <input onChange={updateMyUser} type="password" name="password" placeholder='Password' className='form-control bg-dark border-0 text-white my-3'/>
                        <button className={`btn btn-primary w-100 ${styles.formBtn}`}>Create Account</button>
                    </form>
                    <p className='text-muted text-center my-3'>This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" className='text-muted' target="_blank" rel="noreferrer">Privacy Policy</a> and <a href="https://policies.google.com/terms" className='text-muted' target="_blank" rel="noreferrer">Terms of Service</a> apply.</p>
                    <hr />
                    <p className=' text-center'>Already a member? <span className={`${styles.cursorPointer} text-primary`} onClick={goToLogin}>Log In<i _ngcontent-yft-c22="" className="fas fa-chevron-right small"></i></span></p>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}
