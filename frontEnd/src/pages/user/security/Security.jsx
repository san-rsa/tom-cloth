import React, { useState, useEffect, createContext, useContext  } from "react";
import Nav from "../../../components/sub component/Nav"
import { AlertError, AlertSuccess, Inputs } from "../../../components/sub component/list/Generallist";
import { Link, Navigate, redirect, useNavigate, useParams} from "react-router-dom";
import Style from "../../../styles/Security.module.css"
import Footer from "../../../components/sub component/Footer";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";


const Login = () => {

    const [data, setInputs] = useState({});
    const [submitbtn, setSubmitBtn] = useState(false)
  

    const navigate = useNavigate();




    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
  
     

    const HandleSubmit = async (event) => {
      event.preventDefault();
      setSubmitBtn(!submitbtn)
  
      const formData = new FormData();
    


      formData.append('data',  JSON.stringify(data));
  
  
  
     const api = fetch(process.env.REACT_APP_API_LINK + 'auth/login', {
      method: 'POST',
       credentials: "include",
      //  headers: {'Content-Type': "application/json", },
      body:   formData
      })
      
      .then((res) => {           

         if (res.status == 200) {

 
          navigate("/user"); 

         } else {
          setSubmitBtn(false);
          AlertError(data.message)

     
         }

         return res.json()
      }).then(
        data => {
          console.log(data.message, 'llk')       

         
          if (data.success == false) {
             AlertError(data.message)

             setSubmitBtn(false);
             
          } else {
            //  navigate("/user"); 

          }
        }).catch((e) => {
        console.log(e);
        setSubmitBtn(false)
        AlertError("error try again later")

      })


      
  
  
   
    
    }

     
     
    //  .then((res) => {
    //     const { tokenss } = res.json();
    //    // setToken(token);
        
    //     console.log(tokenss, res)    
    //    if (res.status == 200)     {
    //     // navigate("/user"); 
    //    } 
    //     console.log(res.status)
  
    // }).then((info) => {
    //   const { token } = info.json();
    
    //   console.log(token, info)

    
    // })
            //setToken(token);

     

    //  const { tokens } = await api.json();
    // setTokens(tokens);


  
  

      
  //     console.log(token)    
  //     console.log(info)

     
  // }).catch((e) => {
  //     console.log(e);
     
  //   })       
     



 
  
      console.log( data)






      // try {
      //   const response =fetch('http://localhost:8000/login/', {
      //       method: 'POST',
      //       headers: myHeaders,
      //       body: JSON.stringify(data)
      //       })   
      //   setToken(response.data.token);
      //   localStorage.setItem("token", response.data.token);
      //   navigate("/dashboard");
      // } catch (error) {
      //   console.error("Authentication failed:", error);
      //   setToken(null);
      //   localStorage.removeItem("token");
      //   if (error.response && error.response.data) {
      //     setErrorMessage(error.response.data); // Set the error message if present in the error response
      //   } else {
      //     setErrorMessage("An unexpected error occurred. Please try again.");
      //   }}  







      
    


    return (
        <div className={Style.app}>
         <Nav />

            <h1> SIGN IN</h1>

                <form onSubmit={HandleSubmit} >
                    
            <Inputs name="email" type={"text"} onchange={handleChange} value={data.email} placeholder={"your email or username "} label={"email or username"} />
            <Inputs name="password" type={"password"} onchange={handleChange} value={data.password} label={"password"} />

            <button className="login" type="submit" disabled={submitbtn} > Log in</button> 

            <h5 className={Style.forgetpass}> can't remember password click:  <Link to={"/forgetpassword"}> forget Password</Link> </h5>


            <h3 className={Style.alternate} > New here you can sign up <Link to={"/register"}> here now</Link> </h3>
                     
               </form>

            </div>
        

    )
}



const Register = () => {
    const [data, setInputs] = useState({});
    const [img, setFile] = useState({});
    const [submitbtn, setSubmitBtn] = useState(false)
  
    let navigate = useNavigate()

    




    const handleFileChange = (event) => {
      setFile(event.target.files)
    };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }




        const HandleSubmit = async (event) => {
          event.preventDefault();
          setSubmitBtn(!submitbtn)
      
          const formData = new FormData();
        
      
          Array.from(img).forEach(imgs => {
      
            formData.append('img', imgs);
      
        });
      
              formData.append('data',  JSON.stringify(data));
      
      
      
         const api = fetch(process.env.REACT_APP_API_LINK + 'auth/register/', {
          method: 'POST',
          // credentials: "include",
         // headers: {'Content-Type': "application/json", },
          body:   formData
          })
          
          .then((res) => {           
  
             if (res.status == 200) {
  
           
  
            
                  navigate("/login"); 
  
             } else {
              setSubmitBtn(false);
         
             }
  
             return res.json()
          }).then(
            data => {
              console.log(data.message, 'llk')       
  
             
              if (data.success == false) {
                 AlertError(data.message)
  
                 setSubmitBtn(false);
                 
              } else {
                //  navigate("/user"); 
  
              }
            }).catch((e) => {
            console.log(e);
            setSubmitBtn(false)
            AlertError("error try again later")
  
          })
  
  
          
      
      
       
        
        }
    





  


    return (
        <div className={Style.app} >
         <Nav />
<form onSubmit={HandleSubmit}>

            <h1> SIGN UP</h1>

                <div className={Style.inp}>

            <Inputs name="fname" type={"text"} onchange={handleChange} value={data.fname} placeholder={"your first name "} label={"first name"}  disabled={false} required={true} />   
            <Inputs name="lname" type={"text"} onchange={handleChange} value={data.lname} placeholder={"your last name "} label={"last name"}  disabled={false} required={true} />

            <Inputs name="username" type={"text"} onchange={handleChange} value={data.username} placeholder={"username"} label={"username "}  disabled={false} required={true} />
            <Inputs name="email" type={"email"} onchange={handleChange} value={data.email} placeholder={"your email "} label={"email"}  disabled={false} required={true} />

            <Inputs name="phone" type={"number"} onchange={handleChange} value={data.phone} placeholder={"your phone number "} label={"phone number"}  disabled={false} required={true} />

            <Inputs name="password" type={"password"} onchange={handleChange} value={data.password} placeholder={"password "} label={"password"}  disabled={false} required={true} />
       
            <Inputs label={'picture'} type={'file'} name={'picture'} onchange={handleFileChange} value={data.picture}  placeholder={'first name'} disabled={false} required={true}  />

                </div>

           
            <button className="login"  type="submit" disabled={submitbtn}> Sign up</button> 


            <h3 className={Style.alternate} > Have an account sign in <Link to={"/login"}> here now</Link> </h3>
</form>

<Footer />
            </div>
        

    )
}



const ResetPassword = () => {

  const link = useParams().token

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().required("Required").min(6, "Too Short!"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      const { newPassword } = values;
      const token =  window.location.pathname.split("/").pop();

      console.log(token, link)

     fetch(process.env.REACT_APP_API_LINK + `auth/reset-password/${token}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({newPassword: newPassword})
         })
        .then((response) => {
          AlertSuccess.success(response) // .data.message);
          // setTimeout(() => {
          //   window.location.href = "/signin";
          // }, 3000);
        })
        .catch((error) => {
          console.log(error);
          AlertError.error("Your link has expired");
        });
    },
  });

  return (
    <>
      <div className="bg-secondary h-screen">
        <Nav />
        <div className="flex justify-center my-32">
          <div className="bg-white p-16 rounded-lg">
            <h1 className="text-3xl font-semibold">Reset Password</h1>
            <form onSubmit={formik.handleSubmit} className="mt-5">
              <label
                htmlFor="newPassword"
                className={`text-sm  ${
                  formik.touched.newPassword && formik.errors.newPassword
                    ? "text-red-500"
                    : ""
                }`}
              >
                {formik.touched.newPassword && formik.errors.newPassword
                  ? formik.errors.newPassword
                  : "New Password"}
              </label>
              <motion.input
                type="password"
                placeholder="New Password"
                className={`border-2 w-full p-2 focus:outline-none rounded-md
                ${
                  formik.touched.newPassword && formik.errors.newPassword
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-secondary border-primary"
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
                name="newPassword"
                id="newPassword"
              />

              <label
                htmlFor="confirmPassword"
                className={`text-sm  ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "text-red-500"
                    : ""
                }`}
              >
                {formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? formik.errors.confirmPassword
                  : "Confirm Password"}
              </label>
              <motion.input
                type="password"
                placeholder="Confirm Password"
                className={`border-2 w-full p-2 focus:outline-none rounded-md
                ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-secondary border-primary"
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                name="confirmPassword"
                id="confirmPassword"
              />

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="submit"
                className="bg-primary text-white w-full mt-5 p-2 rounded-md"
              >
                Reset Password
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};




const ForgetPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      fetch( '/auth/forgetpassword/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values)
         })
        .then((response) => {
          console.log(response)
          
          AlertSuccess("Email sent successfully");
          
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response === 404) {
            AlertError("Email not found");
          } else {
            AlertError("Server error");
          }
        });
    },
  });

  return (
    <>
      <div className="bg-secondary h-screen">
        <Nav />
        <div className="flex justify-center my-32">
          <div className="bg-white p-16 rounded-lg">
            <h1 className="text-3xl font-semibold">Forget Password</h1>
            <form onSubmit={formik.handleSubmit} className="mt-5">
              <label
                htmlFor="email"
                className={`text-sm  ${
                  formik.touched.email && formik.errors.email
                    ? "text-red-500"
                    : ""
                }`}
              >
                {formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : "Email"}
              </label>
              <motion.input
                type="email"
                placeholder="Email"
                className={`border-2  w-full p-2 focus:outline-none  rounded-md
                ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-secondary border-primary"
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                name="email"
                id="email"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="submit"
                className="bg-primary text-white w-full mt-5 p-2 rounded-md"
              >
                Send Email
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};









export {Register, Login, ResetPassword, ForgetPassword}