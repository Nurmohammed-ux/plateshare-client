import { createUserWithEmailAndPassword } from "firebase/auth";
import AuthContext from "./AuthContext";
import { auth } from "../firebase/firebase.init";
import { useState } from "react";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const authInfo = {
    user: null,
    loading,
    createUser,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
