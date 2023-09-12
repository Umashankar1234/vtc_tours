import React from "react";
var CryptoJS = require("crypto-js");
const AESKEY = "873518d8d7a146f184173f87b86ffc35";
export const AuthContext = React.createContext();
export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      var cipherUser = CryptoJS.AES.encrypt(
        (action.payload.user),
        AESKEY
      ).toString();
      localStorage.setItem("user", cipherUser);
      localStorage.setItem("token", cipherUser);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.user
      };
    case "LOGOUT":
      // localStorage.clear();
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loan_id: null
      };
    case "Loan":
      // localStorage.clear();
      localStorage.setItem("loan_id", action.loan_id);
      return {
        ...state,
        isAuthenticated: true,
        loan_id: action.loan_id
      };
    case "Insurance":
      // localStorage.clear();
      localStorage.setItem("medical_expense", action.medical_expense);
      localStorage.setItem("years", action.years);
      return {
        ...state,
        isAuthenticated: true,
        medical_expense: action.medical_expense,
        years: action.years
      };
    default:
      return state;
  }
};
export function CheckRouteAccessSeller(pathname) {
  var encKey = "873518d8d7a146f184173f87b86ffc35";
  var userbytes =
    localStorage.getItem("user") &&
    CryptoJS.AES.decrypt(localStorage.getItem("user"), encKey);
  let user = userbytes && userbytes.toString(CryptoJS.enc.Utf8);
  if (user && JSON.parse(user).user_type === 1) return true;
  else return false;
}
export function CheckRouteAccessBidder(pathname) {
  var encKey = "873518d8d7a146f184173f87b86ffc35";
  var userbytes =
    localStorage.getItem("user") &&
    CryptoJS.AES.decrypt(localStorage.getItem("user"), encKey);
  let user = userbytes && userbytes.toString(CryptoJS.enc.Utf8);
  if (user && JSON.parse(user).user_type === 2) return true;
  else return false;
}