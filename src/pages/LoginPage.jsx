// import { toast } from "react-toastify";
// import Cookies from "js-cookie";

// import { TOKEN } from "../constants";
// import { useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";

// import request from "../server";

// import "../sass/LoginPage.scss";

// const LoginPage = () => {
//   const { setIsAuthenticated } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const login = async () => {
//     try {
//       let user = {
//         username: "abdulaziz",
//         password: "7456321",
//       };
//       let {
//         data: { token },
//       } = await request.post("auth/login", user);
//       Cookies.set(TOKEN, token);
//       setIsAuthenticated(true);
//       navigate("/myposts");
//     } catch (err) {
//       toast.error("Error");
//     }
//   };
//   return (
//     <section className="login">
//       <h2 className="login-name">Login</h2>
//       <form className="form">
//         <input type="text" placeholder="Username" />
//         <input type="password" placeholder="Password" />
//         <button onClick={login}>Login</button>
//       </form>
//     </section>
//   );
// };

// export default LoginPage;

import { toast } from "react-toastify";
import Cookies from "js-cookie";

import { TOKEN } from "../constants";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import request from "../server";

import "../sass/LoginPage.scss";

const LoginPage = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    try {
      const user = {
        username: "abdulaziz",
        password: "1234567",
      };
      const {
        data: { token },
      } = await request.post("/auth/login", user);
      Cookies.set(TOKEN, token);
      setIsAuthenticated(true);
      navigate("/myposts");
    } catch (err) {
      toast.error("Error");
    }
  };

  return (
    <section className="login">
      <h2 className="login-name">Login</h2>
      <form className="form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="button" onClick={login}>
          Login
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
