import React from "react";
import { useState } from "react";
import { collection, query, where, getDocs, serverTimestamp, getDoc} from "firebase/firestore";
import { db } from "../firebase";
import {AuthContext} from "../context/AuthContex";
import { doc, setDoc, updateDoc } from "firebase/firestore"; 
import { useContext } from "react";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const {currentuser} = useContext(AuthContext);

  
    
     
    const handleSearch = async () => {
      const q = query(
        collection(db, "users"),
        where("displayName", "==", username)
      );
    
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      } catch (err) {
        setErr(true);
      }
    };
 
 
    const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  }

 
  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
    currentuser  .uid > user.uid
        ? currentuser.uid + user.uid
        : user.uid + currentuser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        

        //create user chats
        await updateDoc(doc(db, "userChats", currentuser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
          
        });

        console.log("added successfully user1")
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentuser.uid,
            displayName: currentuser.displayName,
            photoURL: currentuser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
         
        });
        console.log("added successfully user2")
      }
    } catch (err) {
      console.log(err);
    }

    setUser(null);
    setUsername("")
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        
        />
      </div>

      {err && <span>User Not Found</span>}
      {/* {err &&  console.log("this is error"+" "+err)} */}

      {user && <div className="userChat" onClick={handleSelect}>
        <img
          src={user.photoURL}
          alt="logo"
        />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
          <p>{user.lastMessage?.text}</p>
        </div>
      </div>}
     
      </div>
  );
};

export default Search;
