import {configureStore} from '@reduxjs/toolkit'
import { authReducer } from './authSlice';
import { postReducer } from './postSlice';
import { commentReducer } from './commentSlice';

const store = configureStore({
    reducer : {
        auth : authReducer,
        posts : postReducer,
        comments : commentReducer
    }
})

export default store;