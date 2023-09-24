import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import './style.scss'


const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
 

  useEffect(()=>{

  },[location.pathname])

  return (<React.Fragment>
    <div className="contain">
        <div className="nav">
            <div className="logo">
              <h1 onClick={() => navigate("/")}>Hola<b>Food</b></h1>
            </div>
            <ul>
              <li className="active home" onClick={() => navigate("/")}><span>Home</span></li>
              <li className="menu" onClick={() => navigate("/menu")}><span>Menu</span></li>
              <li className="services"><span>Service</span></li>
              <li className="about"><span>About Us</span></li>
              <li className="gallery"><span>Gallery</span></li>
            </ul>
            <div className="action">
              <button className="signIn" onClick={() => navigate("/login")}>Sign In</button>
              <button className="signUp" onClick={() => navigate("/signUp")}>Sign Up</button>
            </div>
        </div>
        
      </div>
  </React.Fragment>);
};

export default Header;
