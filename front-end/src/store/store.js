import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice'

const store = configureStore({
    reducer :{
        auth : authReducer,
    },
})

export default store


// ConfigureStore : une function qui prend un objet de configuration(구성) comme argument 
// reducer : Cune clé de l'objet represente une tranche de létat global. 