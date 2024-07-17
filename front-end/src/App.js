
import './css/main.css';
import {Routes, Route} from 'react-router-dom';
import React from 'react'
import Menu from './components/Menu'
import Home from './pages/home'
import SignIn from './pages/signIn'
import User from './pages/user'

function App() {
  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/index.html" element={<Home />} />
        <Route path="/sign-in.html" element={<SignIn />} />
        <Route path="/user.html" element={<User />} />
      </Routes>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
}

export default App;
