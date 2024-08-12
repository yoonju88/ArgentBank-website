import React, {useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin, userProfile} from '../redux/api';
import { useNavigate } from 'react-router-dom';
import { loginUserStart, loginUserFailure, loginUserSuccess } from '../redux/authSlice';
import Button from '../components/Button' 
import Field from '../components/Field';


function Login() {
    const dispatch = useDispatch() // useDispatch provides a straightforward way to dispatch actions from within function components, enabling you to trigger state changes in Redux store 
    const [email, setUserEmail] = useState('')
    const [password, setUserPassword] = useState('')
    const { loading, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginUserStart());
        const resultAction = await dispatch(userLogin({ email, password })); // send the userLogin with props 
        if (userLogin.fulfilled.match(resultAction)) { // check if the dispatched action resultAction matches the fullfiled state of the userLogin async thunk.
            const { token } = resultAction.payload.body
            localStorage.setItem('userToken', token)
            //console.log("save token", token)
            const fetchProfile = await userProfile(token) //request user info by token
            const userData = fetchProfile.body 
            dispatch(loginUserSuccess({ //send to server reducer to update login status with userdata and token
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