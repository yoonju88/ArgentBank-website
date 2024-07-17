import React, {useState, useEffect} from 'react'
import logo from '../img/argentBankLogo.webp';
import {Link} from 'react-router-dom';

function Menu () {
   {/*
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] =useState('')

    useEffect (() => {
        const loginStatus = async() => {
            const loggedIn = await isLoggedIn();
            const user =await getUserInfo()
            setIsLoggedIn(loggedIn);
            if (user){
                setUserName(user.name)
            }
        }
        loginStatus()
    }, [])
    */} 

    return (
        <header>
            <nav className="main-nav">
                <Link className="main-nav-logo" to="/index.html">
                    <img
                    className="main-nav-logo-image"
                    src={logo}
                    alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>
                    {/* {isLoggedIn ? (
                        <>
                            <Link className="main-nav-item" to="/user.html">
                                <i className="fa fa-user-circle"></i>
                                {userName}
                            </Link>
                            <Link className="main-nav-item" to="/index.html">
                                <i className="fa fa-sign-out"></i>
                                Sign Out
                            </Link>
                        </>
                    ) : (*/}
                        <Link className="main-nav-item" to="/sign-in.html">
                            <i className="fa fa-user-circle"></i>
                            Sign In
                        </Link>
                {/*)} */}
                </div>
            </nav>
        </header>
    )
}

export default Menu;