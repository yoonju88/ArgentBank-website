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
  const token = localStorage.getItem('userToken')
  const storedUser = localStorage.getItem('user')

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) return 
      try {
        if (!storedUser) {
          const response = await userProfile(token);
          const userData = response.body
          dispatch(loginUserSuccess({ user: userData, token }))
        } else if (storedUser) {
          const userData = JSON.parse(storedUser)
          dispatch(loginUserSuccess({ user: userData , token })); // parse : used to convert a JSON string into a JavaScript object
        }
      } catch (error) {
        console.error('Failed to receive user profile', error)
      } 
    }
    fetchUserProfile()
  }, [dispatch, storedUser, token]) // Ensure that the login status is maintained even when navitagint to a new page.

  return (
    <>
      <Menu />
      <main className={`${currentPage === '/' || currentPage === '/404' ? " " : " bg-dark"} main`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/404" element={<ErrorPage />} />
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
