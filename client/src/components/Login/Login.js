import { useState } from "react";
import { Link } from "react-router-dom";

import userInstance from "../../axios/userInstance";

//redux
import { useDispatch } from "react-redux";
import { signIn } from "../../store/actions/authActions";

//import {GoogleLogin} from "react-google-login";

const Login = () => {
  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      if (userDetails.email !== "" && userDetails.password !== "") {
        const res = dispatch(signIn(userDetails));
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const handleGoogleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const loginRespose = await userInstance.get("/sign");

  //     console.log(loginRespose);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  // const onSuccess = async (res) => {
  //   try {
  //     const result=  await userInstance.post("/login", {
  //       token: res?.tokenId,
  //     });

  //     console.log(result)
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="login-outer-section d-flex align-items-center justify-content-center">
      <section className="login-inner-section shadow">
        <div className="login-content">
          <div className="login-logo">
            <h1>Log In</h1>
            <Link to="/signup">Don't have an account? Sign Up</Link>
          </div>
          <div className="login-line">
            <div></div>
            <p>or</p>
            <div></div>
          </div>
          <section className="login-input-section">
            <form className="login-form">
              <label>EMAIL</label>
              <input
                type="text"
                name="email"
                id="email"
                onChange={handleChange}
              />
              <label>PASSWORD</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
              />
              <div className="remember align-items-center">
                {/* <label>Remember Me</label> */}
                <p>Forgot Password</p>
              </div>

              <button onClick={login}>LOG IN</button>
              <div className="divider my-5"></div>

              <div className="buttons w-100 d-flex align-items-center justify-content-between">
                <button
                  className="btn btn-primary"
                  style={{
                    width: "45%",
                    background: "white",
                    color: "blue",
                    border: "1px solid blue",
                  }}
                >
                  Facebook
                </button>
                <button
                  className="btn btn-secondary"
                  style={{
                    width: "45%",
                    background: "white",
                    color: "red",
                    border: "1px solid red",
                  }}
                >
                  Google
                </button>

                {/* <a href="http://localhost:5000/api/user/v1/auth/google">
                  login
                </a>
                <GoogleLogin
                  clientId={`632118201692-mp9f55iirs4hg2ihm6d4ot5udif1irok.apps.googleusercontent.com`}
                  onSuccess={onSuccess}
                  onFailure={(e,err)=>console.log(err)}
                /> */}
              </div>
            </form>
          </section>
          <small className="login-bottom-text">
            By clicking Log In, Facebook or Google you agree to our new T&C's
          </small>
        </div>
      </section>
    </div>
  );
};

export default Login;
