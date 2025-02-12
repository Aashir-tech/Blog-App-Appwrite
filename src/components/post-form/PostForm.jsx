import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, Select, Input, RTE } from "../index";
import { useNavigate } from "react-router-dom";
import appWriteService from "../../appwrite/conf";
import {useDispatch} from 'react-redux'
import { addPost, updatePost } from "../../store/postSlice";

// If user is editing the form then he will send the post data
const PostForm = ({ post }) => {
  const dispatch = useDispatch();
  const [imageUrl , setImageUrl] = useState(null)

  const navigate = useNavigate();

  const { register, handleSubmit, watch, control, setValue, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.active || "active",
      },
    });

  const userData = useSelector((state) => state.auth.userData);

  // IF Post value is already there ,we update , if not then we create new entry

  const submit = async (data) => {
    // Update Post
    if (post) {
      console.log("Data of form : " , data )
      // Data is given by react-hook-form which inclued all data of form
      const file = data.image[0]
        ? appWriteService.uploadFile(data.image[0])
        : null;

      // Deleting previously uplaod image
      if (file) {
        appWriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appWriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });


      if (dbPost) {
        console.log("Before updating : " , dbPost);

        dispatch(updatePost(dbPost));
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      // User wants to create new form
      const file = await appWriteService.uploadFile(data.image[0])

      if (file) {
        // console.log("File" , file)

        const fileId = file.$id;
        data.featuredImage = fileId;

        // console.log("USer" , userData.$id)
        console.log("Data : ", data);

        const dbPost = await appWriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        // console.log("DB Post" ,dbPost)

        if (dbPost) {
          console.log("Before adding : " , dbPost);
          dispatch(addPost(dbPost));
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  if(post) {
    appWriteService.getFilePreview(post.featuredImage).then((imagePreview) => {
      setImageUrl(imagePreview);
    })
  }

  const slugTransform = useCallback((value) => {
    if(value && typeof value === 'string') {
        const slug = value.toLowerCase().replace(/ /g,'-')
        setValue('slug' , slug)
        return slug
    }

    // if (value && typeof value === "string")
    //   return value
    //     .trim()
    //     .toLowerCase()
        // .replace(/^[a-zA-Z\d\s]+/g, "-")
        // .replace(/\s/g, "-");

    return "";
  });

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          defaultValue = {getValues('slug') || ""}
          {...register("slug", { required: true })}
          onInput={(e) => {
            if(e.currentTarget.value !== "") {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={
            getValues("content") || "<p>Start writing your amazing post...</p>"
          }
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={imageUrl}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
