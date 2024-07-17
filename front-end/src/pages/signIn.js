import React from "react"
import {Link} from "react-router-dom"
 
function SignIn () {
    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form>
                <div className="input-wrapper">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username"  autoComplete="on"/>
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" autoComplete="on" />
                </div>
                <div className="input-remember">
                    <input type="checkbox" id="remember-me" />
                    <label htmlFor="remember-me">Remember me</label>
                </div>
                 {/* PLACEHOLDER DUE TO STATIC SITE  */} 
                <Link to="/user.html" className="sign-in-button">Sign In</Link>
                {/* SHOULD BE THE BUTTON BELOW */} 
                {/*<button className="sign-in-button">Sign In</button> */} 
                </form>
            </section>
        </main>
    )

}

export default SignIn;