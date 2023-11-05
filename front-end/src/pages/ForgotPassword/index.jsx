import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Loading from "../Loading";
import "./ForgotPassword.scss"


function ForgotPassword(){

    const [email, setEmail] = useState()
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleForgot = () =>{
        const emailForgot = {
            email: email.trim()
        }
            setLoading(true)


        axios
        .put("/api/account/forgotPassword", emailForgot)
        .then(res => {
            const status = res.data.status
                setLoading(false)
            if(status === "ERR"){
                toast.warning("Incorrect Email")
            }else{
                navigate("/login")
                toast.success("Reset password successfully!")
            }
        })
        .catch(err => console.log(err))
        setLoading(false)
    }
   
    return(
        <div className="container">
        {loading === false ?<div className="loginContent">
            <div className="leftContent">
            <h1>Forgot Password</h1>
            <img
                src="https://daizdje8zyv90.cloudfront.net/wp-content/uploads/2016/12/Grilled-Clams-with-Charred-Jalapen%CC%83o-Basil-Butter-Half-Baked-Harvest.jpg"
                alt=""
            />
            <h2>Privacy policy {"&"} Term of service</h2>
            </div>
            <div className="rightContent">
                <div className="input">
                <label htmlFor="email">Email: </label>
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter Email "
                    id="email"
                />
                </div>
                
                <div className="handle">
                <button
                style={{width: 100}}
                 className="signUpBtn"  onClick={() => handleForgot()}>Confirm</button>
                </div>
            
            </div>
        </div>:<Loading/>}
    </div>
    )
}

export default ForgotPassword