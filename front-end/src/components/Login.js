import React, {useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin, userProfile} from '../helpers/api';
import { useNavigate } from 'react-router-dom';
import { loginUserStart, loginUserFailure, loginUserSuccess } from '../store/authSlice';
import Button from './Button' 
import Field from './Field';


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
            <Field
                label="Email"
                type="email"
                id="email"
                name="Email"
                autoComplete="on"
                value={email}                
                onChange={(e) => setUserEmail(e.target.value)}
                Required
            />
            <Field
                label="Password"
                type="password"
                id="password"
                name="Password"
                autoComplete="on"
                value={password}                
                onChange={(e) => setUserPassword(e.target.value)}
                Required
            />
                <div className="input-remember">
                    <input type="checkbox" id="remember-me" />
                    <label htmlFor="remember-me">Remember me</label>
                </div>
                <Button 
                    className="sign-in-button" 
                    type="submit"
                    loading ={loading}
                >        
                    Sign In 
                </Button>
            </form>
            {error && 
            <div className="error-container">
                <p className='error-msg'>{error.message}</p>
            </div>
            }
        </>
    )
}

export default Login