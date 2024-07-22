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
                        'Content-Type': 'application/json'
                    }
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
        const response = await axios.post(`{baseUrl)/user/profile`, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return response.data
            console.log('pofile data', response.data)
        }catch (error) {
            console.log('Error posting user profile', error)
            throw error
        }
}
/*
export const signup = async (email, password, firstName, lastName, userName) => {
    try {
        const response = await axios.post(`${baseUrl}/user/signup`, {
            email,
            password,
            firstName,
            lastName,
            userName,
        }, {
            header : {
                'Content-Type' : 'application/json'
            }
        })
        return response.data;
    } catch (error) {
        throw error;
    }
}
*/