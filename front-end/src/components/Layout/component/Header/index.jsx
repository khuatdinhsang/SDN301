import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { logout } from "../../../../actions/accountAction";
import LoginIcon from '@mui/icons-material/Login';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './style.scss'


const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const account = useSelector(state => state.account)
  const cartList = useSelector((state) => state.cart)
  const [classActive, setClassActive] = useState('')

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
    setClassActive(location.pathname)
  },[location.pathname])

  return (<React.Fragment>
    <div className="contain">
        <div className="nav">
            <div className="logo">
              <h1 onClick={() => navigate("/")}>Hola<b>Food</b></h1>
            </div>
            <ul>
              <li className={classActive === '/' ? "active home" : "home"} onClick={() => navigate("/")}><span>Home</span></li>
              <li className={classActive.includes('menu') ? "active menu" : "menu"} onClick={() => navigate("/menu")}><span>Menu</span></li>
              <li className="services"><span>Service</span></li>
              <li className="about"><span>About Us</span></li>
              <li className="gallery"><span>Gallery</span></li>
            </ul>
            <div className="action">
              {account?.username !== undefined?
              <>
                <span className="cartIcon" onClick={() => navigate('/cart')}><ShoppingCartIcon className="shoppingCart"/>
                <span className="dot">{cartList?.length}</span>

                </span>
                <span className="usernameHeader">Hello, {account?.username}</span>
                <button className="signIn" onClick={() => {
                  handleAdmin();
                }}>Dashboard</button>
                <button className="signUp" onClick={() => {
                  handleLogout();
                }}>Logout</button>
              </>:
              <>
                <span className="cartIcon" onClick={() => navigate('/cart')}><ShoppingCartIcon className="shoppingCart" /></span>
                <button className="signIn" onClick={() => navigate("/signUp")}>Sign Up</button>
                <button className="signUp" onClick={() => navigate("/login")}><span>Sign In <LoginIcon className="loginIcon"/></span></button>
              </>}
              
            </div>
        </div>
        
      </div>
  </React.Fragment>);
};

export default Header;
