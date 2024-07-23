import {createSlice} from '@reduxjs/toolkit'
import {userLogin} from '../helpers/api'

const initialState = {
    user:null,
    token: localStorage.getItem('userToken') || null, // initial token state with localstorage to verifie an token existe.
    loading:false,
    error:null // for monitoring the registration process. 
}

const authSlice = createSlice ({
    name: 'auth',
    initialState,
    reducers:{
        loginUserStart(state) {
            state.loading = true;
            state.error = null;
        },
        loginUserSuccess(state, action){
            state.loading = false;
            state.user = action.payload.user
            state.token = action.payload.token;
            state.error = null;
        },
        loginUserFailure(state, action){
            state.loading = false;
            state.error = action.payload;
        },
        logoutUser(state) {
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
                state.user = action.payload.body // save userData here
                state.token = action.payload.body.token; // save userToken here
                state.error = null;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
})

export const { loginUserStart,loginUserSuccess,loginUserFailure,logoutUser} = authSlice.actions
export default authSlice.reducer