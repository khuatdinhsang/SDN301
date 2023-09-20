import React from "react";
import { useNavigate } from "react-router";
import './style.scss'


const Header = () => {
  const navigate = useNavigate()

  return (<React.Fragment>
    <div className="contain">
        <div className="nav">
            <div className="logo">
              <h1 onClick={() => navigate("/")}>Hola<b>Food</b></h1>
            </div>
            <ul>
              <li className="active" onClick={() => navigate("/")}><span>Home</span></li>
              <li><span>Menu</span></li>
              <li><span>Service</span></li>
              <li><span>About Us</span></li>
              <li><span>Gallery</span></li>
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
