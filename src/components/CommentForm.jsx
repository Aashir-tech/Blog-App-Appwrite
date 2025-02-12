import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from './Button';

const CommentForm = ({onCommentSubmit , postId , userId , username }) => {
  console.log("User id inside form " , userId)
    // const author = comments && comments.map((comment) => comment.userId === userId ? true : false);
    // setIsAuthor(author);
    const {register , handleSubmit , reset} = useForm();

    const onSubmit = (data) => {
      console.log("Post id " , postId , "user id ", userId , "content " , data.content , "username "  , username)
        onCommentSubmit(postId , userId , data.content , username)
        // setUpdatedContent(data.content);
        reset()
    }

  return (
    <>
        <form className='p-4 flex justify-between m-3 w-full mx-auto' onSubmit={handleSubmit(onSubmit)}>
            <textarea className='w-full rounded-lg mr-2 p-2'
            placeholder='Write your comment here...'
            {...register("content" , {required : true})}
            />
            <Button className='hover:bg-blue-600' type='submit'>Post Comment</Button>
        </form>
    </>
  )
}

export default CommentForm