import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comments : []
}

const commentSlice = createSlice({
    name : "comment",
    initialState,
    reducers : {
        addComment : (state , action) => {
            state.comments.unshift(action.payload);
        },

        setComment : (state , action) => {
            state.comments = action.payload;
        },

        updateComment : (state , action) => {
            state.comments = state.comments.map((comment) => comment.$id === action.payload.id ? {...comment, content :action.payload.content} : comment)
        },

        removeComment : (state , action) => {
            state.comments = state.comments.filter((comment) => comment.$id !== action.payload)
        }
        
    }
})


export const {addComment , updateComment , removeComment , setComment} = commentSlice.actions;
export const commentReducer = commentSlice.reducer;