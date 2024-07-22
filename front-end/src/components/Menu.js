import React,{useEffect, useState} from 'react'
import logo from '../img/argentBankLogo.webp';
import {NavLink} from 'react-router-dom';
import { useDispatch, useSelector} from "react-redux";
import { logoutUser } from '../store/authSlice';

function Menu () {
    const dispatch = useDispatch()
    const {user, token} = useSelector((state)=> state.auth)
    const [userData, setUserData]= useState(null)

    useEffect (() => {
        if (user&& token) {
            setUserData(user)
        }
    }, [user, token])

    const handleLogOut = () => {
        localStorage.removeItem('userToken')  
        dispatch(logoutUser())   // update Redux state : remove userdata and token
    }
  
    return (
        <header>
            <nav className="main-nav">
                <NavLink className="main-nav-logo" to="/">
                    <img
                    className="main-nav-logo-image"
                    src={logo}
                    alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </NavLink>
                <div>
                {token ? (
                    <>
                        <NavLink className="main-nav-item" to="/profile">
                            <i className="fa fa-user-circle"></i>
                            {userData?.firstName}
                        </NavLink>
                        <NavLink className="main-nav-item" to='/' onClick={handleLogOut}>
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </NavLink> 
                    </>
                    ) :(
                        <NavLink className="main-nav-item" to="/login">
                            <i className="fa fa-user-circle"></i>
                                Sign In
                         </NavLink>
                    )}
                </div>                
            </nav>
        </header>
    )
}

export default Menu;