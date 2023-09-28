import { useContext } from "react";
import Cookies from "js-cookie";

import { AuthContext } from "../../contexts/AuthContext";
import { TOKEN } from "../../constants";
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
    <div className="log-out" style={{ margin: "20px", textAlign: "center" }}>
      <div className="container">
        <h2 style={{ fontFamily: "sen", fontSize: "35px" }}>AccountPage</h2>
        <button
          style={{
            padding: "15px 25px",
            cursor: "pointer",
            marginTop: "10px",
            fontSize: "20px",
            background: "blue",
            color: "white",
            fontFamily: 'sen',
            border: 'none',
            borderRadius: "10px",
          }}
          onClick={logout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
