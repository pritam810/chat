import React from 'react'
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContex';
import { ChatContext } from '../context/ChatContax';
import {v4 as uuid} from "uuid";
import {db} from "../firebase";
import { doc, updateDoc, arrayUnion, arrayRemove, Timestamp, serverTimestamp } from "firebase/firestore";
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const Input = () => {

  const[text, setText] = useState("");
  const[img, setImg] = useState(null);
  const [err, setErr] = useState("");
  

  const {currentuser} =useContext(AuthContext);
  const {data} =useContext(ChatContext);

  const handleSend=async ()=>{

    if(img){
      
    
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      await uploadTask.then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateDoc(doc(db, "chats", data.chatId),{
                      messages: arrayUnion({
                        id:uuid(),
                        text,
                        senderId: currentuser.uid,
                        date:Timestamp.now(),
                        img: downloadURL,
                      })
                    })
                  }catch(error){
                    setErr(err);

                  }
                })
              });

      // uploadTask.on(
      //   (error)=>{
      //      setErr(true);
      //   },
      //   ()=>{
      //     getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) =>{
      //       await updateDoc(doc(db, "chats", data.chatId),{
      //         messages: arrayUnion({
      //           id:uuid(),
      //           text,
      //           senderId: currentuser.uid,
      //           date:Timestamp.now(),
      //           img: downloadURL,
      //         })
      //       })
      //   });
      // });


    }else{
      await updateDoc(doc(db, "chats", data.chatId),{
        messages: arrayUnion({
          id:uuid(),
          text,
          senderId: currentuser.uid,
          date:Timestamp.now(),
        })
      })
    }

    await updateDoc(doc(db, "userChats", currentuser.uid), {
      [data.chatId + ".lastMessage"]:{
        text,
      },
      [data.chatId+ ".date"]: serverTimestamp(),
    })

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]:{
        text,
      },
      [data.chatId+ ".date"]: serverTimestamp(),
    })
  setText("")
  setImg(null);

  }
  return (
    <div className='input'>
     <input type="text" placeholder="Type something..." onChange={e=>setText(e.target.value)}
     value={text}/>
     <div className="send">
      <i className="fa-solid fa-paperclip"></i>
      <input type="file" style={{display:"none"}} id="file" onChange={e=>setImg(e.target.files[0])} />
      <label htmlFor="file">
      <i className="fa-solid fa-image"></i>
      </label>
      <button onClick={handleSend}>Send</button>
     </div>
      
    </div>
  )
}

export default Input
