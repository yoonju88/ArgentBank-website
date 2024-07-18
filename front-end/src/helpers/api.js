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
            return response.data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)
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