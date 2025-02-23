import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
import Menu from './components/Menu';
import AboutUs from './components/AboutUs'
import Contact from './components/Contact';
import Login from './components/Login'
import Cart from './components/Cart';
import { useEffect, useState } from 'react';
import Dynamic from './components/Dynamic';
import Cookies from "js-cookie";
import { authAction } from './ReduxStore/Authenticate';
import { useDispatch, useSelector } from 'react-redux';
import Location from './components/Location';
import FAQ from './components/FAQ';
import Profile from './components/Profile';
import { Toast } from './components/Toast';
function App(){
  const dispatch=useDispatch();
  const isEmail=useSelector((state)=>state.authReducer.isEmail)
  const isAuthenticate=useSelector((state)=>state.authReducer.isAuthenticate)
  const email=Cookies?.get("email")
  function ScrollToHash() {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [hash]);

    return null;
}
  useEffect(()=>{
    if(email){
    dispatch(authAction.changeEmailValue(email))
    }
  },[email])
  return(
      <div>
        <ScrollToHash />
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/menu" element={<Menu/>}/>
            <Route path="/aboutus" element={ <AboutUs/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/login" element={<Login />}/>
            <Route path='/cart' element={isEmail && isAuthenticate ? <Cart/> : <div><Toast message={"Login to access Cart"}  onClose={()=>{console.log("Toast")}}/><Login /></div>}/>
            <Route path='/faq' element={<FAQ/>}/>
            <Route path='/menu/:id' element={<Dynamic/>}/>
            <Route path='/location' element={<Location/>}/>
            <Route path="/profile" element={isEmail && isAuthenticate ? <Profile/> : <div><Toast message={"Login to access Profile"}  onClose={()=>{console.log("Toast")}}/><Login /></div>}/>
          </Routes>
      </div>
  
  )
}
export default App;