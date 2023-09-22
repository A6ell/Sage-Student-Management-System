import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ErrorPage from "./page/Error";
import HomePage from "./page/Home";
import AboutUs from "./page/AboutUs";
import LoginPage from "./page/Login";
import SignUpPage from "./page/SignUp";
import RegistrarPage from "./page/Registrar";
import CoursePage from "./page/Courses";
import NotFound from "./page/NotFound";
import { useAuthContext } from './hook/useAuthcontext';

const Router = () => {
  const { user } = useAuthContext();
  const typo = localStorage.getItem('type');

  return (
    <Routes>
      <Route 
      path="*" element={<NotFound />} />

      <Route 
      path={"/"} element={<HomePage />} 
      errorElement={<ErrorPage />} />

      <Route
        path={"/about-us"}
        element={<AboutUs />}
        errorElement={<ErrorPage />}
      />

      <Route
        path={"/login"}
        element={user ?  <RegistrarPage /> : <HomePage />}
        errorElement={<ErrorPage />}
      />

      <Route
        path={"/sign-up"}
        element={user ? <RegistrarPage /> : <HomePage />}
        errorElement={<ErrorPage />}
      />

      <Route
        path={"/registrar"}
        element={user ? <RegistrarPage /> : <HomePage />}
        errorElement={<ErrorPage />}
      />

      <Route
        path={"/course"}
        element={user ? (typo === '"registrar"' ? <CoursePage /> : <RegistrarPage />) : <HomePage />}
        // element={user ? <CoursePage /> : <HomePage />}
        errorElement={<ErrorPage />}
      />
    </Routes>
  );
};

// {}

export default Router;
