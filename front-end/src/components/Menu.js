import React from 'react'
import logo from '../img/argentBankLogo.webp';
import {NavLink} from 'react-router-dom';
import { useSelector } from "react-redux";

function Menu () {
    const user = useSelector ((state)=> state.auth.user)
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
                    {user ? (
                    <>
                        <NavLink className="main-nav-item" to="/profile">
                            <i class="fa fa-user-circle"></i>
                            {user.firstName}
                        </NavLink>
                        <NavLink className="main-nav-item" to="/">
                            <i class="fa fa-sign-out"></i>
                            Sign Out
                        </NavLink> 
                    </>
                    ) :(
                        <NavLink className="main-nav-item" to="/login">
                            <i className="fa fa-user-circle"></i>
                                Sign In
                         </NavLink>
                    )}
                    
                   {/* <NavLink className="main-nav-item" to="/profile">
                        <i class="fa fa-user-circle"></i>
                        Tony
                    </NavLink>
                    <NavLink className="main-nav-item" to="/">
                        <i class="fa fa-sign-out"></i>
                         Sign Out
                    </NavLink> */}
                </div>                
            </nav>
        </header>
    )
}

export default Menu;