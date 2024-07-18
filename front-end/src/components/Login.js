import React from 'react'
import {useDispatch, useSelector } from 'react-redux'
import {userLogin} from '../helpers/api';
import {useNavigate} from 'react-router-dom';
import { loginUserStart } from '../store/authSlice';


function Login() {
    const dispatch = useDispatch();
    const {loading, error} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault ();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const resultAction= await dispatch(userLogin({email, password}));
        if (userLogin.fulfilled.match(resultAction)) {
            navigate('/profile');
        }    else {
            console.error('login failed', resultAction.payload)
        }      
    };

    return (
        <>
            <form onSubmit={handleLogin}>
                <div className="input-wrapper">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="on"
                        required
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="on"
                        required
                    />
                </div>
                <div className="input-remember">
                    <input type="checkbox" id="remember-me" />
                    <label htmlFor="remember-me">Remember me</label>
                </div>
                <button className="sign-in-button" type="submit">Sign In</button>
            </form>
            {loading && <p>Loading</p>}
            {error&& <p>{error.message}</p>}
        </>
    )
}

export default Login