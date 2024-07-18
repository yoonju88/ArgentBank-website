import React from "react"
import Login from "../components/Login"
 
function SignIn () {
    return (
        <>
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <Login />
            </section>
        </>
    )

}

export default SignIn;