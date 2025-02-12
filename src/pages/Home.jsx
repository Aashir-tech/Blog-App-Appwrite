import React, { useEffect, useState } from "react";
import appWriteService from "../appwrite/conf";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import {useDispatch} from 'react-redux'
import { addPost, setPost } from "../store/postSlice";

const Home = () => {
  const dispatch = useDispatch();

  const [posts, setPosts] = useState(null);
  const authStatus = useSelector((state) => state.auth.status);
  const [loader, setLoader] = useState(true);

  console.log("LoaderState: " , loader)

  useEffect(() => {
    
    appWriteService.getPosts([]).then((posts) => {
        setLoader(true)
      if (posts) {
        dispatch(setPost(posts.documents));
        setPosts(posts.documents);
        setLoader(false);
        console.log("Posts Documents", posts.documents);
      }
    });
  }, []);

  return loader ? (
    <div className="flex justify-center items-center h-screen">
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
      
    ) : posts?.length === 0 ? (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              {authStatus ? (
                <h1 className="text-2xl font-bold hover:text-gray-500">
                  No Posts at the moment
                </h1>
              ) : (
                <h1 className="text-2xl font-bold hover:text-gray-500">
                  Login to read posts
                </h1>
              )}
            </div>
          </div>
        </Container>
      </div>
    ) : (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap justify-center md:justify-center ">
            {posts &&
              posts.map((post) => (
                <div key={post.$id} className="m-1">
                  <PostCard {...post} />
                </div>
              ))}
          </div>
        </Container>
      </div>
    );
  };
  
export default Home;
