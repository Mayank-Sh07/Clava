import React, { useEffect, useState, useContext } from "react";
import { FirebaseContext } from "./init";

export const UserContext = React.createContext(null);

const UserContextProvider = ({ children }) => {
  console.log("USER CONTEXT PRV");
  const Firebase = useContext(FirebaseContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    console.log("User Context CDM");
    console.log(Firebase.jigyasa);
    const unSubscribe = Firebase.auth.onAuthStateChanged((user) => {
      console.log(user);
      setCurrentUser(user);
      setPending(false);
    });

    return () => {
      unSubscribe();
    };
  }, [Firebase]);

  if (pending) {
    return <>Loading...</>;
  }

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
