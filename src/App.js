import React, { useReducer, useEffect } from "react";
import './App.css';
import AppRoutes from "./AppRoutes";
import { reducer } from "./CommonMethods/Authentication";
import { AuthContext } from "./CommonMethods/Authentication";
var CryptoJS = require("crypto-js");
export default function App() {
  const initialState = {
    isAuthenticated: false,
    user: null,
    token: null
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const VerifyAuth = () => {
    var encKey = "873518d8d7a146f184173f87b86ffc35";
    var userbytes =
      localStorage.getItem("user") &&
      CryptoJS.AES.decrypt(localStorage.getItem("user"), encKey);
     
    let user = userbytes && userbytes.toString(CryptoJS.enc.Utf8);
    const token =
      userbytes && userbytes.toString(CryptoJS.enc.Utf8);
    // eslint-disable-next-line no-const-assign
    if (user && token) {
      dispatch({
        type: "LOGIN",
        payload: {
          user,
          token
        }
      });
    } else dispatch({ type: "LOGOUT" });
  };
  useEffect(() => {
    VerifyAuth();
  }, []);
  return (
    <AuthContext.Provider
    value={{
      state,
      dispatch
    }}
  >
    <AppRoutes />
  </AuthContext.Provider>
  );
};

