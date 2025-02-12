import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    posts : []
}

const postSlice = createSlice({
    name : "post",
    initialState,
    reducers : {
        addPost : (state , action) => {
            state.posts.push(action.payload); 
        },

        setPost : (state , action) => {
            state.posts = action.payload; //Replaces all posts with new array
        },

        updatePost : (state , action) => {
            state.posts = state.posts.map((post) => post.$id === action.payload.$id ? action.payload : post) 
        },

        removePost : (state , action) => {
            state.posts = state.posts.filter((post) => post.$id !== action.payload.$id)
        }
    }
})

export const {addPost , updatePost , setPost , removePost} = postSlice.actions;
export const postReducer = postSlice.reducer;