import React,{useEffect, useState} from 'react'
import logo from '../img/argentBankLogo.webp';
import {NavLink} from 'react-router-dom';
import { useSelector } from "react-redux";

function Menu () {
    const [ownAToken, setOwnAToken] = useState(null)
    const haveToken = useSelector((state)=> state.auth.token)

    useEffect(() => {
        if (haveToken){
            setOwnAToken(haveToken)
        }
    },[haveToken])

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
                    {haveToken ? (
                    <>
                        <NavLink className="main-nav-item" to="/profile">
                            <i class="fa fa-user-circle"></i>
                            Name
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