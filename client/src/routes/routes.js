import React, { useEffect } from "react";
import { useRoutes, useNavigate } from "react-router-dom";

//pages
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Main from "../pages/main/Main";
import Home from "../pages/app/Home";
import QuestionDetailPage from "../pages/app/QuestionDetail";
import ProfilePage from "../pages/app/Profile";
import EditProfilePage from "../pages/app/EditProfile";
import UserAnswerPage from "../pages/app/UserAnswerPage";
import UserQuestionPage from "../pages/app/UserQuestionPage";
import BookmarkAnswerPage from "../pages/app/BookmarkAnswerPage";

//protected
import LoggedInProtection from "./LoggedInProtection";
import LoggedOutProtection from "./LoggedOutProtection";

//redux
import { getToken, deleteToken } from "../store/localStorage";
import { loadProfile } from "../store/actions/authActions";
import { useSelector, useDispatch } from "react-redux";

// ----------------------------------------------------------------------

export default function Router() {
  const { isSignedIn = false } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getToken();
      if (token && !isSignedIn) {
        const loadProfileResponse = await dispatch(loadProfile(token));
        if (loadProfileResponse) {
          deleteToken();
          navigate("/");
        }
      }
    };
    fetchProfile();
  }, [isSignedIn, dispatch, navigate]);

  return useRoutes([
    {
      path: "/",
      element: (
        <LoggedOutProtection redirectTo={"/main/home"}>
          <Login />
        </LoggedOutProtection>
      ),
    },
    {
      path: "signup",
      element: (
        <LoggedOutProtection redirectTo={"/main/home"}>
          <Signup />
        </LoggedOutProtection>
      ),
    },
    {
      path: "main",
      element: (
        <LoggedInProtection redirectTo={"/"}>
          <Main />
        </LoggedInProtection>
      ),
      children: [
        {
          path: "home",
          element: (
            <LoggedInProtection redirectTo={"/"}>
              <Home />
            </LoggedInProtection>
          ),
        },
        {
          path: "question-detail/:questionId",
          element: (
            <LoggedInProtection redirectTo={"/"}>
              <QuestionDetailPage />
            </LoggedInProtection>
          ),
        },
        {
          path: "profile",
          element: (
            <LoggedInProtection redirectTo={"/"}>
              <ProfilePage />
            </LoggedInProtection>
          ),
        },
        {
          path: "edit-profile",
          element: (
            <LoggedInProtection redirectTo={"/"}>
              <EditProfilePage />
            </LoggedInProtection>
          ),
        },
        {
          path: "profile/user-answers",
          element: (
            <LoggedInProtection redirectTo={"/"}>
              <UserAnswerPage />
            </LoggedInProtection>
          ),
        },
        {
          path: "profile/user-questions",
          element: (
            <LoggedInProtection redirectTo={"/"}>
              <UserQuestionPage />
            </LoggedInProtection>
          ),
        },
        {
          path: "profile/bookmark-answers",
          element: (
            <LoggedInProtection redirectTo={"/"}>
              <BookmarkAnswerPage />
            </LoggedInProtection>
          ),
        },
      ],
    },
  ]);
}
