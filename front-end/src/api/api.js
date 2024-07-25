//createAsyncThunk : to handle asynchronous operations related to user authentication and profile management.
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = "http://localhost:3001/api/v1"

export const userLogin = createAsyncThunk(
    'auth/login', 
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${baseUrl}/user/login`,
                { email, password },
                {
                    headers: {
                        'Accept': `application/json`,
                        'Content-Type': 'application/json'
                    },
                }
            )
            return response.data
        } catch (error) {
            if (error.response) {
                console.log('error response data:', error.response.data)
                return rejectWithValue(error.response.data)
            } else {
                console.log('error message:', error.message)
                return rejectWithValue(error.message)
            }
        }
    }
)

export const userProfile = async (token) => {
    try {
        const response = await axios.post(
            `${baseUrl}/user/profile`,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
        return response.data
    } catch (error) {
        console.log('Error posting user profile', error)
        throw error
    }
}

export const updateUserProfile = createAsyncThunk(
    'auth/updateUserName',
    async ({ newUserName, token }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${baseUrl}/user/profile`,
                { userName: newUserName },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
            //console.log('reception new data', response.data)
            return response.data.body // re-send the user data with new userName
        } catch (error) {
            console.error('API request failed:', error.response || error.message);
            return rejectWithValue(error.response.data)
        }
    }
)


// createAsyncThunk : 
// automatically generates action type ans action creators => pending, fulfilled ans rejected

//'auth/login' : is the action type prefix used to identify the action. 
//               the action type strings automatically generated by 'createAsyncThunk'
//               'auth/login/pending', 'auth/login/fulfilled', 'auth/login/rejected'
//{rehectWithValue} : is an objet provide by 'createAsyncThunk' that includes utility function for handling error.