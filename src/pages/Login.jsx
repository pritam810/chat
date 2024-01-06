import React from 'react';
import { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase"
import { toast } from 'react-toastify';

function Login() {

  const[err, setErr] = useState(false);
  const navigate = useNavigate();
   const [showerr, setShowerr] = useState(false)
   const [toggle, setToggle] = useState(true)
 
    const handleSubmit= async (e)=>{
     e.preventDefault()
     const email = e.target[0].value;
     const password = e.target[1].value;

     if(!email && ! password){
      return toast.warning("please fill in all fields!");
     }

     if(! password){
      return toast.warning("password mandatory!");
     }
 
 try{
   setToggle(false);
  await signInWithEmailAndPassword(auth, email, password);
  toast.success("login successfully!!");
  navigate("/")
 
 }catch(err){
   console.log("this is error"+" "+ err);
     setErr(true);
     setShowerr(true);
     setToggle(true);

     setTimeout(()=>{
      setShowerr(false) }, 3000);
    
     }
    
  
 }


  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">chat app</span>
            <span className="title">Login</span>
            <form  name="contact-form" onSubmit={handleSubmit}>
                <input type="email" placeholder="email" />
                <input type='password' placeholder="password"/>
               
                {toggle && <button>sign up</button>}
                {!toggle && <p className="shwwait"><span>please wait...</span></p>}

                {err && showerr && <span style={{color: "red"}}>Something went wrong</span>}
            </form>
            <p>you don't have an account? <Link to="/register">Register</Link></p>
        </div>
        
      
    </div>
  )
}

export default Login;
