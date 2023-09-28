import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

import FrontLayout from "./components/layout/front";

import HomePage from "./pages/public/HomePage";
import CategoryPage from "./pages/public/CategoryPage";
import AllPostsPage from "./pages/public/AllPostsPage";
import BlogPostsPage from "./pages/public/BlogPostsPage";
import AboutUsPage from "./pages/public/AboutUsPage";
import RegisterPage from "./pages/public/RegisterPage";
import LoginPage from "./pages/public/LoginPage";
import NotFoundPage from "./pages/public/NotFoundPage";

import MyPostsPage from "./pages/user/MyPostsPage";

import AccountPage from "./pages/common/AccountPage";
import DashboardPage from "./pages/admin/dashboard";
import CategoriesPage from "./pages/admin/categories";
import UsersPage from "./pages/admin/users";
import AdminLayout from "./components/layout/admin";

function App() {
  const { isAuthenticated, role } = useContext(AuthContext);
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
        {isAuthenticated && role === "admin" ? (
          <Route path="/" element={<AdminLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="users" element={<UsersPage />} />
          </Route>
        ) : null}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
