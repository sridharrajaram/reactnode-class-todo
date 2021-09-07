import './LoginRegister.css';
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {useFormik} from 'formik';
import env from './UrlSettings.js'

function Login() {
    
    const history = useHistory(); //calling useHistory function for redirection to other component

    const formik = useFormik({
        initialValues:{
            firstName:"",
            lastName:"",
            emailAddress:"",
            password:"",
            confirmpassword:"",
        },
        validate: (values) => {
            const errors = {};
            if(!values.firstName){
                errors.firstName = "Required"
            }
            if(!values.lastName){
                errors.lastName ="Required"
            }
            if(!values.emailAddress){
                errors.emailAddress ="Required"
            }
            if(!values.password){
                errors.password ="Required"
            }
            if(!values.confirmpassword){
                errors.confirmpassword ="Required"
            }

            return errors;
        },
        onSubmit: async (values) => {
            console.log(values);
            try {
                
                let users = await axios.post(`${env.api}/register`,values);
                console.log(users.data.message);
            } catch (error) {
                console.log(error);
            }
    
           history.push("/login") //redirection command to users component
        }

    })

    return (
        <>
            <div class="sidenav">
                <div class="login-main-text">
                    <h2>Application<br /> Register Page</h2>
                    <p>Register here to get Login access.</p>
                </div>
            </div>
            <div class="main">
                <div class="col-md-6 col-sm-12">
                    <div class="register-form">
                        <form onSubmit={formik.handleSubmit}>
                            <div class="form-group">
                                <label>First Name</label>
                                <input type="text"
                                    name="firstName" 
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    class="form-control"
                                    placeholder="Firstname"
                                />
                                {
                                    formik.errors.firstName ? <span style={{color:"red"}}>{formik.errors.firstName}</span> : null
                                }
                            </div>
                            <div class="form-group">
                                <label>Last Name</label>
                                <input type="text"
                                    name="lastName"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange} 
                                    class="form-control" 
                                    placeholder="Lastname" 
                                />
                                {
                                    formik.errors.lastName ? <span style={{color:"red"}}>{formik.errors.lastName}</span> : null
                                }
                            </div>
                            <div class="form-group">
                                <label>Email Address</label>
                                <input type="text" 
                                    name="emailAddress"
                                    value={formik.values.emailAddress}
                                    onChange={formik.handleChange}
                                    class="form-control" 
                                    placeholder="Email Address" 
                                />
                                {
                                    formik.errors.emailAddress ? <span style={{color:"red"}}>{formik.errors.emailAddress}</span> : null
                                }
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" 
                                    name="password" 
                                    value={formik.values.password} 
                                    onChange={formik.handleChange} 
                                    class="form-control" 
                                    placeholder="Password" 
                                />
                                {
                                    formik.errors.password ? <span style={{color:"red"}}>{formik.errors.password}</span> : null
                                }
                            </div>
                            <div class="form-group">
                                <label>Confirm Password</label>
                                <input type="password" 
                                    name="confirmpassword" 
                                    value={formik.values.confirmpassword} 
                                    onChange={formik.handleChange} 
                                    class="form-control" 
                                    placeholder="Confirm Password" 
                                />
                                {
                                    formik.errors.confirmpassword ? <span style={{color:"red"}}>{formik.errors.confirmpassword}</span> : null
                                }
                            </div><br/>
                            <input type="submit" class="btn btn-black" value="Sign up"/>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
