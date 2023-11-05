import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import "./ChangePassword.scss"

function ChangePassword(){

    const [oldPassword, setOldPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [confirmNewPassword, setConfirmPassword] = useState()

      const account = useSelector(state => state.account)


    const navigate = useNavigate()

 

    const handleChangePassword =() => {
        
           if(confirmNewPassword !== newPassword){
                toast.warning("Password is not match!!!")
            }else{
                const userChange ={
                    currentPassword: oldPassword,
                    newPassword: newPassword,
                    confirmPassword: confirmNewPassword
                }
                axios
                        .put('/api/account/changePassword', userChange, {
                            headers: {
                                Authorization: `Bearer ${account?.accessToken}`
                            }
                        })
                        .then(res => {
                            toast("Change password successfully!")
                            navigate("/")
                        })
                        .catch(err => console.log(err ))
            }
       
    }

    return(
        <div className="container">
      <div className="loginContent">
        <div className="leftContent">
          <h1>Change Password</h1>
          <img
            src="https://daizdje8zyv90.cloudfront.net/wp-content/uploads/2016/12/Grilled-Clams-with-Charred-Jalapen%CC%83o-Basil-Butter-Half-Baked-Harvest.jpg"
            alt=""
          />
          <h2>Privacy policy {"&"} Term of service</h2>
        </div>
        <div className="rightContent">
            <div className="input">
              <label htmlFor="oldPass">Old Password: </label>
              <input
                placeholder="Enter Old Password"
                id="oldPass"
                type={"password"}
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
              />
            </div>
            <div className="input">
              <label htmlFor="newPassword">New Password:</label>
              <input
                placeholder="New Password"
                type={"password"}
                id="newPassword"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
            </div>
            <div className="input">
              <label htmlFor="confirmNewPassword">Confirm New Password:</label>
              <input
                placeholder="Confirm New Password"
                type={"password"}
                id="confirmNewPassword"
                value={confirmNewPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>
            <p
              style={{
                color: "#f9004d",
                textAlign: "left",
                fontSize: "12px",
                display: "none",
              }}
            >
              Incorrect Email or Password
            </p>
           
            <div className="handle">
              <button className="signUpBtn" onClick={() => handleChangePassword()}>Change</button>
              <i className="remember" onClick={() => navigate("/login")}>Have remember password?</i>
            </div>
          
        </div>
      </div>
    </div>
    )
}

export default ChangePassword