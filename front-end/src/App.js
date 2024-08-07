import "./main.css"
import { Routes, Route, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react'
import Menu from './containers/Menu'
import Home from './pages/home'
import SignIn from './pages/signIn'
import Profile from './pages/profile'
import ErrorPage from './pages/ErrorPage'
import ErrorAll from "./components/errorAll";
import { useDispatch } from "react-redux";
import { loginUserSuccess } from "./redux/authSlice";
import { userProfile } from "./redux/api";


function App() {
  const dispatch = useDispatch()
  const location = useLocation() // which page user is currently on 
  const currentPage = location.pathname; //console.log('currentpage:', currentPage)

  useEffect(() => {
      const token = localStorage.getItem('userToken')
      const receptionUserProfile = async () => {
        if (token) {
        try {
          const response = await userProfile(token);
          const userData = response.body
          //console.log('user info',userData)
          dispatch(loginUserSuccess({ user: userData, token }))
        } catch (error) {
          console.error('Failed to receive user profile', error)
        }
      }
    }
    receptionUserProfile()
  }, [dispatch,location]) // Ensure that the login status is maintained even when navitagint to a new page.

  return (
    <>
      <Menu />
      <main className={`${currentPage === '/' || currentPage === '/error' ? " " : " bg-dark"} main`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<ErrorAll />} />
        </Routes>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
}

export default App;
