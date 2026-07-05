import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const authInfo = {
    user : null
  }  
  return (
    <AuthContext value={authInfo}>{children}</AuthContext>
  );
};

export default AuthProvider;