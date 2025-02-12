import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import appWriteService from "../appwrite/conf";

const EditPost = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [post, setPost] = useState(null);

  useEffect(() => {
    if (slug) {
      appWriteService.getPost(slug).then((post) => {
        if (post) {
            setPost({...post , slug});
            console.log("Edit Post Data : ", post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
};

export default EditPost;
