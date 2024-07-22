import "./main.css"
import {Routes, Route, useLocation} from 'react-router-dom';
import React from 'react'
import Menu from './components/Menu'
import Home from './pages/home'
import SignIn from './pages/signIn'
import User from './pages/user'


function App() {
  const location = useLocation()
  const currentPage = location.pathname;
  return (
    <>
      <Menu />
      <main className={currentPage === '/' ? "" : "main bg-dark"}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/profile" element={<User />} />
      </Routes>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
}

export default App;
