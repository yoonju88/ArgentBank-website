import { createSlice } from '@reduxjs/toolkit'
import { userLogin, updateUserProfile } from '../api/api'

//define the initial state 
const initialState = {
    user:  {},//set itnitial userdata from local storage 
    token: localStorage.getItem('userToken') || null, // Take the token from localstorage to initial token state
    loading: false,
    error: null // for monitoring the registration process. 
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {  
        loginUserStart(state) { 
            state.loading = true;
            state.error = null; // 
        },
        loginUserSuccess(state, action) {
            state.loading = false;
            state.user = action.payload.user // save userdata when login 
            state.token = action.payload.token; // save userToken when login
            state.error = null;
        },
        loginUserFailure(state, action) {
            state.loading = false;
            state.error = action.payload; // save error when login failed
        },
        logoutUser(state) {
            state.user = null;
            state.token = null
            localStorage.removeItem('userToken')
        },
        updateUserSuccess(state, action) {
            state.user = { ...state.user, ...action.payload } // update the user state with new data
        },
        updateUserFailure(state, action) {
            state.error = action.payload // gestion the error update
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userLogin.fulfilled, (state, action) => { // fulfilled : 'createAsyncThunk' action has been resolved successfully, and the data returned from the API or service is available. 
                state.loading = false;
                state.user = action.payload.body // save userData here
                state.token = action.payload.body.token; // save userToken here
                localStorage.setItem('userToken', action.payload.token) // save userToken after login to localstorage
                state.error = null;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                //console.log('payload:', action.payload)
                state.user = { ...state.user, ...action.payload } //Updates only the userName element of the userData objet
                state.loading = false;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                //console.log('payload faild:', action.payload)
                state.loading = false;
                state.error = action.payload;
            })
    },
})

export const {
    loginUserStart,
    loginUserSuccess,
    loginUserFailure,
    logoutUser,
    updateUserSuccess,
    updateUserFailure,
} = authSlice.actions;

export default authSlice.reducer


//reducer : a function that takes the current state and action then return to new state. 
// action.js and reducer has a important element for managing the state changes. 'createSlice' makes managing these association simpler. 
//payload : represents the data returned from an asynchronous operation or passed along with the action. 
//       is used to update the Redux state based on the result of the async operation. 
// state.user = { ...state.user, ...action.payload } : 
// for updating part of a state object while keeping the existing properties intact(=remaining in its original state ) 

