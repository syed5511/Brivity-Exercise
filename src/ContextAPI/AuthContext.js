import React, { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [userInfo, setUserInfoState] = useState({
    isAuthenticated: false,
    isLoading: false,
    display_name: null,
    id: null,
    error: null,
  });

  const setUserInfo = (data) => {
    setUserInfoState({ ...userInfo, ...data });
  };

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo }}>
      {props.children}
    </AuthContext.Provider>
  );
};
