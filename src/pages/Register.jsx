import React from 'react';
import add from "../image/addAvatar.png";
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth, storage} from "../firebase";
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import {db} from "../firebase";
import {useNavigate, Link} from "react-router-dom";
import { toast } from 'react-toastify';


function Register() {
  
 const[err, setErr] = useState(false);
 const [toggle, setToggle] = useState(true)
 const [showerr, setShowerr] = useState(false)
 const navigate = useNavigate();

   const handleSubmit= async (e)=>{
    e.preventDefault()
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    if(!displayName && !email && !password ){
      return toast.warning("please fill in all fields!");
     }

     if(!password ){
      return toast.warning("password mandatory!");
     }

    try {
      //Create user
      setToggle(false);
      const res = await createUserWithEmailAndPassword(auth, email, password);
     
      toast.success("create user successfully!!");
     

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      await uploadTask.then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

      // uploadTask.on(
      //   (error)=>{
      //      setErr(true);
      //   },
      //   ()=>{
      //     getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) =>{
      //       await updateProfile(res.user,{
      //         displayName,
      //         photoURL: downloadURL,
      //       })
      //     })
      //   }
      // })
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
          
         
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setToggle(true);
            
            
             
            
          
          }
        });
      });
    } catch (err) {
      setErr(true);
      setToggle(true);
      setShowerr(true);
          
      setTimeout(()=>{
        setShowerr(false) }, 3000);
      
    
    }
  };




  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">chat app</span>
            <span className="title">Register</span>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="display name"/>
                <input type="email" placeholder="email"/>
                <input type='password' placeholder="password"/>
                <input style={{display:"none"}} type="file" id="file"/>
                <label htmlFor="file">
                  <img src={add} />
                  <span>Add an avatar</span>
                </label>
                {toggle && <button>sign up</button>}
                {!toggle && <p className="shwwait"><span>please wait...</span></p>}

                {err && showerr && <span style={{color:"red"}}>Something went wrong</span>}
            </form>
            <p>Do you have an account? <Link to="/login">Login</Link></p>
        </div>
        
      
    </div>
  )
}

export default Register
