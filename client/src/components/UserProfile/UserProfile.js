import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const navigate = useNavigate();

  const { name, email } = useSelector((state) => state.auth);

  return (
    <>
      <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
        <div className="card shadow px-4 py-5">
          <div className=" image d-flex flex-column justify-content-center align-items-center">
            <button className="btn btn-secondary">
              <img
                src="https://i.imgur.com/wvxPV9S.png"
                height="100"
                width="100"
              />
            </button>
            <span className="name mt-3">{name}</span>
            <span className="idd">{email}</span>

            <div className=" d-flex mt-2">
              <button
                className="btn1 btn-dark"
                onClick={() => navigate("/main/edit-profile")}
              >
                Edit Profile
              </button>
            </div>
            <div className="text mt-3">
              <span>
                Eleanor Pena is a creator of minimalistic x bold graphics and
                digital artwork.Artist/ Creative Director by Day #NFT minting@
                with FND night.
              </span>
            </div>
            <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
              <span>
                <i className="fa fa-twitter"></i>
              </span>
              <span>
                <i className="fa fa-facebook-f"></i>
              </span>
              <span>
                <i className="fa fa-instagram"></i>
              </span>
              <span>
                <i className="fa fa-linkedin"></i>
              </span>
            </div>
            <div className=" px-2 rounded mt-4 date ">
              <span className="join">Joined May,2021</span>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
