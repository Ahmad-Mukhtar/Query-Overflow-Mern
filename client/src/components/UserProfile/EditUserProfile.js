import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userInstance from "../../axios/userInstance";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../store/localStorage";
import { loadProfile } from "../../store/actions/authActions";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const token = getToken();
  const { email } = useSelector((state) => state.auth);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    console.log(userDetails)
  };

  const edit = async (e) => {
    e.preventDefault();
    try {
      if (userDetails.firstName !== "" && userDetails.lastName !== "") {
        const profileResponse = await userInstance.post(
          "/edit-profile",
          {
            email:email,
            firstName:userDetails.firstName,
            lastName:userDetails.lastName
          },
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        console.log(profileResponse)
        dispatch(loadProfile(token));
        navigate('/main/profile')
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="signup">
      <section>
        <h1>Edit Profile</h1>
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

          <div className="btn-section">
            <div className="signup-btn">
              <button onClick={edit}>Edit</button>
            </div>
          </div>
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
        </form>
      </section>
    </div>
  );
};

export default EditProfile;
