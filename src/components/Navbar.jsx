import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContex'
import { useContext } from 'react'

const Navbar = () => {
  const {currentuser} = useContext(AuthContext);
  return (
    <div className="navbar">
        <span className="logo">chat app</span>
        <div className="user">
            <img src={currentuser.photoURL} alt="logo"/>
            <span>{currentuser.displayName}</span>
            <button onClick={()=>signOut(auth)}>logout</button>
        </div>
    </div>
  )
}

export default Navbar
