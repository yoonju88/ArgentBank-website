import React,{useEffect, useState} from 'react'
import logo from '../img/argentBankLogo.webp';
import {NavLink} from 'react-router-dom';
import { useDispatch, useSelector} from "react-redux";
import { logoutUser } from '../redux/authSlice';

function Menu () {
    const dispatch = useDispatch()
    const {user, token} = useSelector((state)=> state.auth) // allow to extract data from the Redux store's state.
    const [firstName, setFirstName] = useState(null)
   
    useEffect (() => {
        if (user && token) {
            setFirstName(user.firstName);
        }
    }, [user, token])

    const handleLogOut = () => {
        localStorage.removeItem('userToken') 
        localStorage.removeItem('user') 
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
                <div className={token? "main-nav-user" : ""}>
                {token ? (
                    <>
                        <NavLink className="main-nav-item " to="/profile">
                            <i className="fa fa-user-circle"></i>
                            { user.userName? user.userName : firstName}
                        </NavLink>
                        <NavLink className="main-nav-item" to="/" onClick={handleLogOut}>
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