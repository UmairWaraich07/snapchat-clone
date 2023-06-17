import React from "react";
import "./Login.css";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { auth, provider } from "../../firebase";
import { login } from "../../features/userSlice";

const Login = () => {
  const dispatch = useDispatch();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((userAuth) => {
        dispatch(
          login({
            displayName: userAuth.user.displayName,
            email: userAuth.user.email,
            photoUrl: userAuth.user.photoURL,
            id: userAuth.user.uid,
          })
        );
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://logos-world.net/wp-content/uploads/2020/04/Snapchat-Emblem.png"
          alt=""
        />
        <Button variant="outlined" className="login__button" onClick={signIn}>
          Sign in
        </Button>
      </div>
    </div>
  );
};

export default Login;
