import "./main.css"
import { Routes, Route, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react'
import Menu from './components/Menu'
import Home from './pages/home'
import SignIn from './pages/signIn'
import Profile from './pages/profile'
import { useDispatch } from "react-redux";
import { loginUserSuccess } from "./store/authSlice";
import { userProfile } from "./helpers/api";

function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  const currentPage = location.pathname;

  useEffect(() => {
    const token = localStorage.getItem('userToken')
    if (token) {
      const receptionUserProfile = async () => {
        try {
          const receptionProfile = await userProfile(token);
          const userData = receptionProfile.body
          dispatch(loginUserSuccess({ user: userData, token }))
        } catch (error) {
          console.error('Failed to receive user profile', error)
        }
      }
      receptionUserProfile()
    }
  }, [dispatch]) // Ensure that the login status is maintained even when navitagint to a new page.

  return (
    <>
      <Menu />
      <main className={currentPage === '/' ? "" : "main bg-dark"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
}

export default App;
