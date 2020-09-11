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
    const unSubscribe = Firebase.auth.onAuthStateChanged((user) => {
      if (user != null) {
        const userName = user.displayName.split(" ");
        setCurrentUser({
          ...user,
          firstName: userName[0],
          regsNumber: userName.pop(),
        });
      } else setCurrentUser(null);
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
