import { useNavigate } from 'react-router'
import './Login.scss'


function Login(){
    const navigate = useNavigate()

    return(
         <div className="container">
            <div className="loginContent">
                <div className="leftContent">
                <h1>Sign In</h1>
                <img src="https://daizdje8zyv90.cloudfront.net/wp-content/uploads/2016/12/Grilled-Clams-with-Charred-Jalapen%CC%83o-Basil-Butter-Half-Baked-Harvest.jpg" alt=''/>
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
                <p
                    style={{
                    color: "#f9004d",
                    textAlign: "left",
                    fontSize: "12px",
                    display: "none",
                    }}
                >
                    Account is Blocked
                </p>
                <div className="handle">
                    <button >Login</button>
                    <a 
                    className="remember"
                    style={{textAlign: "center"}} 
                    >Change Password</a>
                    <a className="remember" >Remember Password</a>
                </div>
                <div className="register">
                    <b >You don't have an account? </b>
                    <p
                    style={{ cursor: "pointer" }}
                    onClick={() => {navigate("/signUp")}}
                    >
                    Register
                    </p>
                </div>
                </div>
            </div>
    </div>
    )
}

export default Login