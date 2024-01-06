import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContex';
import { ChatContext } from '../context/ChatContax';
import { useRef, useEffect, useState } from 'react';

const Message = ({message}) => {

  const {currentuser} =useContext(AuthContext);
  const {data} =useContext(ChatContext);
  

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div ref={ref} className={`message ${message.senderId === currentuser.uid && "owner"}`} >

      <div className="massageInfo">
      <img src={message.senderId === currentuser.uid ? currentuser.photoURL : data.user.photoURL} alt="logo"/>
      <span>just now</span>
      </div>
      <div className="massageContent">
      
        {console.log(new Date().toLocaleTimeString)}
        
        <p>{message.text}</p>
   
        {message.img && <img src= {message.img} />}
      </div>
      </div>
  )
}

export default Message
