// import { useNavigate } from "react-router-dom";
// import { useContext, useState } from "react";
// import Cookies from "js-cookie";

import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import request from "../../server";
import Cookies from "js-cookie";
import { ROLE, TOKEN } from "../../constants";
import { toast } from "react-toastify";

import "../../sass/LoginPage.scss";

// import { ROLE, TOKEN } from "../../constants";
// import { AuthContext } from "../../contexts/AuthContext";

// import request from "../../server";
// import "../../sass/LoginPage.scss";
// import { toast } from "react-toastify";

// const LoginPage = () => {
//   const { setIsAuthenticated, setRole } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [error, setError] = useState("");
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   const validateForm = () => {
//     if (formData.username.trim() === "") {
//       setError("Please enter a username.");
//       return false;
//     }
//     if (formData.password.trim() === "") {
//       setError("Please enter a password.");
//       return false;
//     }
//     setError("");
//     return true;
//   };

//   // const login = async () => {
//   //   try {
//   //     let {
//   //       data: { token, role },
//   //     } = await request.post("auth/login", user);
//   //     if (role === "user") {
//   //       navigate("/my-blogs");
//   //     } else if (role === "admin") {
//   //       navigate("/categories");
//   //     }
//   //     Cookies.set(TOKEN, token);
//   //     Cookies.set(ROLE, role);
//   //     setIsAuthenticated(true);
//   //     setRole(role);
//   //   } catch (err) {
//   //     message.error("Error");
//   //   }
//   // };

//   const login = async () => {
//     if (validateForm()) {
//       try {
//         let {
//           data: { token, role },
//         } = await request.post("/auth/login", formData);
//         if (role === "user") {
//           navigate("/my-blogs");
//         } else if (role === "admin") {
//           navigate("/dashboard");
//         }
//         setIsAuthenticated(true);
//         setRole(role);
//         Cookies.set(TOKEN, token);
//         Cookies.set(ROLE, role);
//         setIsAuthenticated(true);
//         setFormData({
//           username: "",
//           password: "",
//         });
//       } catch (error) {
//         toast.error("Error");
//       }
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     login();
//   };

//   return (
//     <section className="login">
//       <h2 className="login-name">Login</h2>
//       <form className="form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleInputChange}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleInputChange}
//         />
//         {error && <p className="login__error">{error}</p>}
//         <button type="button" onClick={login}>
//           Login
//         </button>
//       </form>
//     </section>
//   );
// };

// export default LoginPage;

const LoginPage = () => {
  const { setIsAuthenticated, setRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (formData.username.trim() === "") {
      setError("Please enter a username.");
      return false;
    }
    if (formData.password.trim() === "") {
      setError("Please enter a password.");
      return false;
    }
    setError("");
    return true;
  };

  const login = async () => {
    if (validateForm()) {
      try {
        let {
          data: { token, role },
        } = await request.post("/auth/login", formData);
        if (role === "user") {
          navigate("/myposts");
        } else if (role === "admin") {
          navigate("/dashboard");
        }
        setIsAuthenticated(true);
        setRole(role);
        Cookies.set(TOKEN, token);
        Cookies.set(ROLE, role);
        setIsAuthenticated(true);
        setFormData({
          username: "",
          password: "",
        });
      } catch (error) {
        toast.error("Error");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  // return (
  //   <section className="login">
  //     <h1 className="login__title">Login</h1>
  //     <form className="login__form" onSubmit={handleSubmit}>
  //       <input
  //         type="text"
  //         name="username"
  //         className="login__input"
  //         placeholder="Username"
  //         value={formData.username}
  //         onChange={handleInputChange}
  //       />
  //       <input
  //         type="password"
  //         name="password"
  //         className="login__input"
  //         placeholder="Password"
  //         value={formData.password}
  //         onChange={handleInputChange}
  //       />
  //       {error && <p className="login__error">{error}</p>}
  //       <button type="submit" className="login__button">
  //         Login
  //       </button>
  //     </form>
  //   </section>
  // );
  return (
    <section className="login">
      <h2 className="login-name">Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {error && <p className="login__error">{error}</p>}
        <button type="button" onClick={login}>
          Login
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
