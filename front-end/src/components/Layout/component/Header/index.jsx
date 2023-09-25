import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { logout } from "../../../../actions/accountAction";
import './style.scss'


const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const account = useSelector(state => state.account)
  const dispatch = useDispatch()
 
  const handleLogout = () =>{
    const action = logout();
    dispatch(action);
    axios
    .post("/api/account/logout")
    .then((res) => {
      if(res.data.status === 'OK'){
        navigate("/")
        toast.success("Logout successfully!")
      }else{
        toast.error("Somethings Wrong!")
      } 
    })
    .catch(err => console.log(err))
    
  }

  const handleAdmin = () =>{
    navigate('/admin/general')
  }

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
              {account?.username !== undefined?
              <>
                <span className="usernameHeader">Hello, {account?.username}</span>
                <button className="signIn" onClick={() => {
                  handleAdmin();
                }}>Dashboard</button>
                <button className="signUp" onClick={() => {
                  handleLogout();
                }}>Logout</button>
              </>:
              <>
                <button className="signIn" onClick={() => navigate("/login")}>Sign In</button>
                <button className="signUp" onClick={() => navigate("/signUp")}>Sign Up</button>
              </>}
              
            </div>
        </div>
        
      </div>
  </React.Fragment>);
};

export default Header;
