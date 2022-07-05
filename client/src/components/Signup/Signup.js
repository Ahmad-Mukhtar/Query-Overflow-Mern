import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import userInstance from "../../axios/userInstance";

//redux
import { useDispatch } from "react-redux";
import { signUp } from "../../store/actions/authActions";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      if (
        userDetails.firstName !== "" &&
        userDetails.lastName !== "" &&
        userDetails.email !== "" &&
        userDetails.password !== ""
      ) {
        const res = dispatch(signUp(userDetails));
        console.log(res)
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="signup">
      <section>
        <h1>Register</h1>
        <form className="signup-form" method="POST">
          <div className="name-field">
            <input
              type="text"
              name="firstName"
              id="firstname"
              placeholder="First name"
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              id="lastname"
              placeholder="Last name"
              onChange={handleChange}
            />
          </div>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={handleChange}
          />

          <div className="btn-section">
            <div className="signup-btn">
              <button onClick={register}>SIGN UP</button>
              <Link to="/login">Login</Link>
            </div>
          </div>
          {/* <>
            <div className="divider mb-5"> </div>
            <button
              className="btn btn-secondary"
              style={{
                width: "100%",
                background: "white",
                color: "red",
                border: "1px solid red",
              }}
            >
              Delete Account
            </button>
          </> */}
        </form>

        <aside className="policy">
          By signing up you accept PeoplePerHour’s Terms of Service and Privacy
          Policy. This site is protected by reCAPTCHA and the Google Privacy
          Policy and Terms of Service apply.
        </aside>
      </section>
    </div>
  );
};

export default Signup;
