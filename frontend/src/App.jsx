import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
import Menu from './components/Menu';
import AboutUs from './components/AboutUs'
import Contact from './components/Contact';
import Login from './components/Login'
import Cart from './components/Cart';
import { useState } from 'react';
import Dynamic from './components/Dynamic';
import Cookies from "js-cookie";
import { authAction } from './ReduxStore/Authenticate';
import { useDispatch } from 'react-redux';
function App(){
  const dispatch=useDispatch();
  const [isAuthenticate,setIsAuthenticate]=useState(Cookies?.get("authToken"))
  const email=Cookies?.get("email")
  dispatch(authAction.changeEmailValue(email))
  return(
      <div>
        
          <Routes>
            <Route path="/" element={<Main isAuthenticate={isAuthenticate} setIsAuthenticate={setIsAuthenticate}/>}/>
            <Route path="/menu" element={isAuthenticate ? <Menu isAuthenticate={isAuthenticate} setIsAuthenticate={setIsAuthenticate}/>:<Login setIsAuthenticate={setIsAuthenticate}/>}/>
            <Route path="/aboutus" element={isAuthenticate ? <AboutUs isAuthenticate={isAuthenticate} setIsAuthenticate={setIsAuthenticate}/>:<Login setIsAuthenticate={setIsAuthenticate}/>}/>
            <Route path="/contact" element={isAuthenticate ? <Contact isAuthenticate={isAuthenticate} setIsAuthenticate={setIsAuthenticate}/>:<Login setIsAuthenticate={setIsAuthenticate}/>}/>
            <Route path="/login" element={<Login />}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/menu/:id' element={<Dynamic/>}/>
          </Routes>
       
       

      </div>
  
  )
}
export default App;