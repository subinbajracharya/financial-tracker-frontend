import { createContext, useContext, useState } from "react";
import { getUserDetail } from "../utils/axiosHelper";

// create context
const UserContext = createContext();

// define provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const autoLogin = async () => {
    console.log("AUTO LOGIN");

    let data = await getUserDetail();

    if (data.status) {
      setUser(data.user);
    } else {
      setUser({});
    }
  };

  let sharedData = {
    user,
    setUser,
    autoLogin,
  };

  // Return what needs to be shared
  return (
    <UserContext.Provider value={sharedData}>{children}</UserContext.Provider>
  );
};

// function to use the context
export const useUser = () => useContext(UserContext);
