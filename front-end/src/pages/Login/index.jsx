import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { loginAccount, logout } from "../../actions/accountAction";
import "./Login.scss";
import { Link as MuiLink } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import { getGoogleUrl } from "../../utils.js";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const action = logout();
    dispatch(action);
    axios
      .post("/api/account/logout")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogin = () => {
    const userLogin = {
            username: username,
            password: password
          }
    axios
      .post("/api/account/login", userLogin)
      .then((res) => {
        // console.log(res.data);
        if (res.data.status === "OK") {
          const user = {
              username: username,
              accessToken: res.data.accessToken
          }
          const action = loginAccount(user);
          dispatch(action);
          // console.log(res.data.accessToken);
          toast.success("Login successfully");
          navigate("/");
        } else {
          toast.error("Username or Password is not correct!");
        }
      })
      .catch((err) => toast(err));
  };
  // const test = () => {
  //   axios.post("/auth/google").then((res) => {
  //     console.log(res.data);
  //   });
  // };
  return (
    <div className="container">
      <div className="loginContent">
        <div className="leftContent">
          <h1>Sign In</h1>
          <img
            src="https://daizdje8zyv90.cloudfront.net/wp-content/uploads/2016/12/Grilled-Clams-with-Charred-Jalapen%CC%83o-Basil-Butter-Half-Baked-Harvest.jpg"
            alt=""
          />
          <h2>Privacy policy {"&"} Term of service</h2>
        </div>
        <div className="rightContent">
          <div className="input">
            <label htmlFor="mail">Username: </label>
            <input
              placeholder="Enter Username "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="mail"
            />
          </div>
          <div className="input">
            <label htmlFor="password">Password:</label>
            <input
              placeholder="Password"
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <button onClick={() => handleLogin()}>Login</button>
            <i className="remember" style={{ textAlign: "center" }}>
              Change Password
            </i>
            <i className="remember">Remember Password</i>
          </div>
          <div className="register">
            <b>You don't have an account? </b>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/signUp");
              }}
            >
              Register
            </p>
          </div>
          <MuiLink
            href={"http://localhost:3001/auth/google"}
            sx={{
              borderRadius: 1,
              py: "0.6rem",
              columnGap: "1rem",
              textDecoration: "none",
              color: "#393e45",
              cursor: "pointer",
              fontWeight: 500,
              margin: "10px 0",
              transition: ".4s",

              "&:hover": {
                backgroundColor: "#fff",
                boxShadow: "0 1px 13px 0 rgb(0 0 0 / 15%)",
                transform: "scale(1.05)"
              },
            }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <GoogleIcon className="googleIcon"/>
          </MuiLink>
          {/* <button onClick={test}>Goi di</button> */}
          <form action="http://localhost:3001/auth/google" method="post">
            <input className="buttonGoogle" type="submit" value="Press to log in" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
