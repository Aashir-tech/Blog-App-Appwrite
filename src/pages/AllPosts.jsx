import React, { useEffect, useState } from "react";
import appWriteService from "../appwrite/conf";
import { Container, PostCard } from "../components";
import { RotatingLines } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import { addPost } from "../store/postSlice";

const AllPosts = () => {
  // const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  
  console.log("POst inside All post : " , posts)
  // const [posts , setPosts] = useState(null);
  // const [loader , setLoader] = useState(true);

  // useEffect(() => {
  //     appWriteService.getPosts([]).then((posts) => {
  //         if(posts) {
  //             // setPosts(posts.documents);
  //             dispatch(addPost(posts));
  //             setLoader(false)
  //         }
  //     })
  // } , [])

  return (
    <>
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap justify-center md:justify-center">
            {posts &&
              posts.map((post) => (
                <div key={post.$id} className="m-2">
                  <PostCard {...post} />
                </div>
              ))}
          </div>
        </Container>
      </div>
    </>
  );
};

export default AllPosts;
