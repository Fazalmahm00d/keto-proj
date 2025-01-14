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
import { useDispatch } from 'react-redux';
import Location from './components/Location';
import FAQ from './components/FAQ';
function App(){
  const dispatch=useDispatch();
  const [isAuthenticate,setIsAuthenticate]=useState(Cookies?.get("authToken"))
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
            <Route path="/" element={<Main isAuthenticate={isAuthenticate} setIsAuthenticate={setIsAuthenticate}/>}/>
            <Route path="/menu" element={<Menu isAuthenticate={isAuthenticate} setIsAuthenticate={setIsAuthenticate}/>}/>
            <Route path="/aboutus" element={ <AboutUs isAuthenticate={isAuthenticate} setIsAuthenticate={setIsAuthenticate}/>}/>
            <Route path="/contact" element={<Contact isAuthenticate={isAuthenticate} setIsAuthenticate={setIsAuthenticate}/>}/>
            <Route path="/login" element={<Login />}/>
            <Route path='/cart' element={isAuthenticate ? <Cart/>:<Login setIsAuthenticate={setIsAuthenticate}/>}/>
            <Route path='/faq' element={<FAQ/>}/>
            <Route path='/menu/:id' element={<Dynamic/>}/>
            <Route path='/location' element={<Location/>}/>
          </Routes>
       
       

      </div>
  
  )
}
export default App;