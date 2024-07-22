import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin, userProfile} from '../helpers/api';
import { useNavigate } from 'react-router-dom';
import { loginUserStart, loginUserFailure, loginUserSuccess } from '../store/authSlice';


function Login() {
    const dispatch = useDispatch();
    const [email, setUserEmail] = useState('')
    const [password, setUserPassword] = useState('')
    const { loading, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginUserStart());
        const resultAction = await dispatch(userLogin({ email, password }));
        if (userLogin.fulfilled.match(resultAction)) {
            const { token } = resultAction.payload.body
            localStorage.setItem('userToken', token)
            console.log("save token", token)
            //request profil data
            const receptionProfile = await userProfile(token)
            const userData = receptionProfile.body
            //save user data
            dispatch(loginUserSuccess({
                user: userData,
                token
            }))
            navigate('/profile') // redirection to profile page
        } else {
            dispatch(loginUserFailure(resultAction.payload))
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
                        value={email}
                        onChange={(e) => setUserEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setUserPassword(e.target.value)}
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
            {error && <p>{error.message}</p>}
        </>
    )
}

export default Login