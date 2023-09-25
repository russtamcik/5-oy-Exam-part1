import { useContext } from "react";
import Cookies from "js-cookie";

import { AuthContext } from "../contexts/AuthContext";
import { TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove(TOKEN);
    navigate("/");
  };
  return (
    <div>
      <h2>AccountPage</h2>
      <button onClick={logout}>Log Out</button>
    </div>
  );
};

export default AccountPage;
