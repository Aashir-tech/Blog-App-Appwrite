import React ,{useEffect , useId, useState} from 'react'
import {Link , useNavigate , useParams} from 'react-router-dom';
import appWriteService from '../appwrite/conf';
import { Button , CommentForm, CommentList, Container } from '../components';
import {useSelector} from 'react-redux';
import parse from 'html-react-parser'
import {useDispatch} from 'react-redux'
import { removePost } from '../store/postSlice';
import { RotatingLines } from 'react-loader-spinner';
import { addComment, setComment, updateComment } from '../store/commentSlice';

const Post = () => {
    const [post , setPost] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {slug} = useParams();
    // const postId = post.$id;

    // const commentId = useId();

    const [postId , setPostId] = useState(null);
//     const userId = userData?.$id;
//   const username = userData?.name;
    const [userId , setUserId] = useState(null);
    const [username , setUserName] = useState(null);

    const [imageUrl , setImageUrl] = useState(null)

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData && post.userId === userData.$id ? true : false

    

    useEffect(() => {
        if(slug) {
            appWriteService.getPost(slug).then((post) => {
                if(post) {
                    appWriteService.fetchComments(post.$id).then((res) => {
                        dispatch(setComment(res?.documents));
                      });
                    // console.log("Post" ,post);
                    // console.log("User data" , userData)
                    setPost(post);
                    setPostId(post.$id)
                    setUserId(userData?.$id);
                    setUserName(userData?.name);
                    // console.log("Post : " , post)
                    // console.log("Post " , post.featuredImage)
                    // console.log("Post documents : " , post.documents)
                } else {
                    navigate('/')
                }
            })
        } else {
            navigate('/');
        }
        
    } , [slug , navigate])


    // console.log("User Id" , userData?.$id)
  
    // useEffect(() => {
        // const imagePreview = appWriteService.getFilePreview(post?.featuredImage);
        // console.log("Image Preview " , imagePreview);
        // console.log("Post Featured Image : " , post.featuredImage)


        // imagePreview.then((url) => {
        //     console.log("URL" , url)
        //     setImageUrl(url)
        // })
    // } , [])
    // console.log("Post Featured Image : " , post?.featuredImage)
    


    const deletePost =  () => {
        appWriteService.deletePost(post.$id).then((status) => {
            if(status) {
                appWriteService.deleteFile(post.featuredImage);
                dispatch(removePost(post.$id));
                console.log("Post after deletion : " ,post)
                navigate('/')
            }
        })
    }

    const handleSubmitComment = async ( postId , userId , content , username) => {
        // console.log("Post " , postId);
        // console.log("content " , content);
        // console.log("user id" , userId);
        // console.log("username " , username)
        try {
            // console.log("User Id inside handle submit " , userId)
                    const newComment = await appWriteService.createComment({ postId , userId , content ,username})
                    if(newComment) {
                        // setUserId(newComment?.userId);
                        dispatch(addComment(newComment));
                        console.log("Added to redux")
                        console.log("New Comment " , newComment);
                    }
            
            
        } catch (error) {
            console.error(error);
        }
    }

    // console.log(imageUrl);
    // console.log("Post : ",post)

    if(post) {
        appWriteService.getFilePreview(post.featuredImage).then((imagePreview) => {
            // console.log("Image Preview " , imagePreview)
            setImageUrl(imagePreview)
        })
    } 


  return post ? (
    <div className='py-8'>
        <Container > 
            <div className="w-full flex justify-center mb-4 relative rounded-xl p-2">
                <img src={imageUrl} alt={post.title} className='rounded-xl w-1/3 max-h-70'/>
            
            {isAuthor && (
                <div className='absolute right-6 top-6'>
                    <Link to={`/edit-post/${post.$id}`}>
                        <Button bgColor="bg-green-500" className="mr-3">
                            Edit
                         </Button>
                    </Link>
                    <Button bgColor='bg-red-500' onClick = {deletePost}>
                        Delete
                    </Button>
                </div>
            )}
            </div>
            <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
             </div>
             <div className="browser-css">
                    {parse(post.content)}
            </div>

            <CommentForm postId={postId} userId={userId} username={username} onCommentSubmit={handleSubmitComment} />
            <CommentList postId={postId} userId={userId} />   

                     
        </Container>
    </div>
  ) :  <div className="flex justify-center items-center h-screen">
  <RotatingLines
    visible={true}
    height="90"
    width="50"
    color="blue"
    strokeWidth="5"
    strokeColor="blue"
    animationDuration="0.75"
    ariaLabel="rotating-lines-loading"
  />
</div>
}

export default Post