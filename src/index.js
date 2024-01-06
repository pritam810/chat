import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContex';
import { ChatContextProvider } from './context/ChatContax';
import "react-toastify/dist/ReactToastify.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <AuthContextProvider>
    <ChatContextProvider>

    <React.StrictMode>
    <App />
  </React.StrictMode>

    </ChatContextProvider>
 
 
    
  </AuthContextProvider>
  
);

