import { Link } from 'react-router-dom';
import './LoginRegister.css';
import axios from 'axios';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import env from './UrlSettings.js'
import { useHistory } from 'react-router-dom';


function Login() {

   const history = useHistory();

   const formik = useFormik({
      initialValues: {
         emailAddress: "",
         password: "",
      },
      validate: (values) => {
         const errors = {};
         if (!values.emailAddress) {
            errors.emailAddress = "Required"
         }
         if (!values.password) {
            errors.password = "Required"
         }
         return errors;
      },
      onSubmit: async (values) => {
         console.log(values);
         try {
            let userlogin = await axios.post(`${env.api}/login`, values);
            alert(userlogin.data.message);
            window.localStorage.setItem("app_token",userlogin.data.token)
            history.push("/todo-list");
         } catch (error) {
            console.log(error);
         }
      }

   })

   return (
      <>
         <div class="sidenav">
            <div class="login-main-text">
               <h2>Application<br /> Login Page</h2>
               <p>Already a Buddy, Login from here to access.</p>
               <p>First time visitor, Click Register and Signup.</p>
            </div>
         </div>
         <div class="main">
            <div class="col-md-6 col-sm-12">
               <div class="login-form">
                  <form onSubmit={formik.handleSubmit}>
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
                           formik.errors.emailAddress ? <span style={{ color: "red" }}>{formik.errors.emailAddress}</span> : null
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
                           formik.errors.password ? <span style={{ color: "red" }}>{formik.errors.password}</span> : null
                        }
                     </div><br />
                     
                        <input type="submit" class="btn btn-black" value="Login"/>&nbsp;
                     <Link to="/register">
                        <button type="submit" class="btn btn-black">Register</button>
                     </Link>
                  </form>
               </div>
            </div>
         </div>
      </>
   )
}

export default Login
