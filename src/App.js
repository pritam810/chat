import Login from "./pages/Login";
import "./style.scss"
import Home from "./pages/Home";
import Register from "./pages/Register"
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { AuthContext } from "./context/AuthContex";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";

function App() {

  const {currentuser} =useContext(AuthContext)
  console.log(currentuser);

  const ProtectedRoute = ({children})=>{
  if(!currentuser){
    return <Navigate to= "/login"/>
  }
  return children
    
  }

  return (

    <div className="App">
      <ToastContainer/>
     <Router>
      <Routes>
        <Route path="/">
            <Route index element={<ProtectedRoute><Home/></ProtectedRoute>}/>
            <Route path="login" element={<Login/>} />
            <Route path="register" element={<Register/>} />
            
        </Route>
      </Routes>
     </Router>
      
      
    </div>
  ) ;
}

export default App;
