import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

import HomePage from "./pages/HomePage";
import FrontLayout from "./components/layout/front";
import CategoryPage from "./pages/CategoryPage";
import AllPostsPage from "./pages/AllPostsPage";
import BlogPostsPage from "./pages/BlogPostsPage";
import AboutUsPage from "./pages/AboutUsPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AccountPage from "./pages/AccountPage";
import MyPostsPage from "./pages/MyPostsPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<FrontLayout />}>
          <Route index element={<HomePage />} />
          <Route path="category/:cateId" element={<CategoryPage />} />
          <Route path="allposts" element={<AllPostsPage />} />
          <Route path="blogpost/:blogId" element={<BlogPostsPage />} />
          <Route path="aboutus" element={<AboutUsPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          {/* {isAuthenticated ? (
            <Route path="myposts" element={<MyPostsPage />} />
          ) : null}
          {isAuthenticated ? (
            <Route path="account" element={<AccountPage />} />
          ) : null} */}

          <Route
            path="myposts"
            element={
              isAuthenticated ? <MyPostsPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="account"
            element={
              isAuthenticated ? <AccountPage /> : <Navigate to="/login" />
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
