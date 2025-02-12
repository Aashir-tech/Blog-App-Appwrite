import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/conf";
import { Link } from "react-router-dom";
import { MagnifyingGlass } from "react-loader-spinner";

const PostCard = ({ $id, title, featuredImage }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const imagePreview = appwriteService.getFilePreview(featuredImage);

  useEffect(() => {
    imagePreview.then((url) => setImageUrl(url));
  }, [imageUrl]);

  // console.log("Image : " , imagePreview)
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4 ">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="rounded-xl"
              width="300"
            />
          ) : (
            <MagnifyingGlass
              visible={true}
              height="80"
              width="80"
              ariaLabel="magnifying-glass-loading"
              wrapperStyle={{}}
              wrapperClass="magnifying-glass-wrapper"
              glassColor="#c0efff"
              color="#e15b64"
            />
          )}
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
