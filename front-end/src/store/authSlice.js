import {createSlice} from '@reduxjs/toolkit'
import {userLogin} from '../helpers/api'

const initialState = {
    user:null,
    token:null,
    loading:false,
    error:null // for monitoring the registration process. 
}

const authSlice = createSlice ({
    name: 'auth',
    initialState,
    reducers:{
        logout(state) {
            state.user = null;
            state.token = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
})

export const {loginUserStart, loginUserSuccess, loginUserFailure} = authSlice.actions
export default authSlice.reducer