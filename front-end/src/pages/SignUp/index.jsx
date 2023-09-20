import { useNavigate } from "react-router"
import "./SignUp.scss"

function SignUp(){
    const navigate = useNavigate()

    return (
        <div className="container">
      <div className="loginContent">
        <div className="leftContent">
          <h1>Sign Up</h1>
          <img src="https://daizdje8zyv90.cloudfront.net/wp-content/uploads/2016/12/Grilled-Clams-with-Charred-Jalapen%CC%83o-Basil-Butter-Half-Baked-Harvest.jpg" alt="" />
          <h2>Privacy policy {"&"} Term of service</h2>
        </div>
        <div className="rightContent">
          <div className="input">
            <label htmlFor="mail">Username: </label>
            <input
              placeholder="Enter Username "
              id="mail"
            />
          </div>
          <div className="input">
            <label htmlFor="password">Password:</label>
            <input
              placeholder="Password"
              type={"password"}
              id="password"
            />
          </div>
          <div className="input">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              placeholder="Confirm Password"
              type={"password"}
              id="confirmPassword"
            />
          </div>
          <div className="input">
            <label htmlFor="displayName">Display Name: </label>
            <input
              placeholder="Enter Display Name"
              id="displayName"
            />
          </div>
          <div className="handle">
            <button onClick={() =>  {navigate("/login")}}>Back to Log In</button>
            <button onClick={() => {}}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
    )
}

export default SignUp