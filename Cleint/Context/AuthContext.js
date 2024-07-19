import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  const [userData, setUserData] = useState({});
  const [globalError, setGlobalError] = useState(null);
  const [profileUpdated,setProfileUpdated]=useState(false)

  signInStart = () => {
    setIsLoading(true);
  };
  signInFailure = (error) => {
    console.log("err", error);
    setIsLoading(false);
    setGlobalError(error);
    setUserData(null);
  };
  signInSuccess = (value) => {
    setIsLoading(false);
    setUserData(value);

  };
  profileUpdateStart = () => {
    setIsLoading(true);
    setProfileUpdated(false)
  }
  profileUpdateSuccess = (data) => {
    setIsLoading(false);
    setGlobalError(null);
    setProfileUpdated(true)
  };
  profileUpdateFailure = (error) => {
    setGlobalError(error);
    setIsLoading(false);
    setProfileUpdated(false)
  };
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        setCurrentUser,
        globalError,
        signInStart,
        signInFailure,
        signInSuccess,
        profileUpdateStart,
        profileUpdateSuccess,
        profileUpdateFailure,
        userData,
        setUserData,
        profileUpdated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
