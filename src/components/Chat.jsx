import React from 'react'
import { useContext } from 'react'

import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContax'

function Chat() {
  const {data} = useContext(ChatContext);
  return (
    <>
        <div className='chatdisp'>
       <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <i className="fa-solid fa-video"></i>
          <i className="fa-solid fa-user-plus"></i>
          <i className="fa-solid fa-ellipsis"></i>
        </div>
       
       </div>
       <Messages/>
       <Input/>
      
    </div>
    </>
  )
}

export default Chat
