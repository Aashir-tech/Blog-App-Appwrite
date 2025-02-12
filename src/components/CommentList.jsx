import React, { useEffect, useState } from "react";
import appWriteService from "../appwrite/conf";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { removeComment, setComment, updateComment } from "../store/commentSlice";
import Input from "./Input";

const CommentList = ({ userId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.comments);
  const [editCommentId, setEditCommentId] = useState(null); // Track the comment being edited
  const [updatedContent, setUpdatedContent] = useState(""); // Track content for the currently edited comment

  return comments?.length === 0 ? (
    <div className="p-4 bg-blue-950 m-3 text-red-800">No comments yet</div>
  ) : (
    <>
      <div className="w-full m-4 mx-auto">
        {comments &&
          comments.map((comment) => {
            const isEditing = editCommentId === comment.$id; // Check if this comment is being edited

            return (
              <div key={comment.$id} className="flex m-4 border-b p-3">
                <h1 className="bg-slate-300 w-1/4 my-auto py-3 rounded-lg p-1 mr-3 font-semibold text-center text-blue-950">Comment by: {comment.username}</h1>
                <Input
                className={"h-full p-1"}
                  readOnly={!isEditing}
                  value={isEditing ? updatedContent : comment.content}
                  onChange={(e) => {
                    if (isEditing) setUpdatedContent(e.target.value);
                  }}
                />
                
                {/* Show edit/delete buttons only if the logged-in user is the comment author */}
                {comment.userId === userId && (
                  <div>
                    <Button
                    className="my-1"
                      bgColor="bg-green-600"
                      onClick={() => {
                        if (isEditing) {
                          // Update the comment if in edit mode
                          appWriteService
                            .updateComment(comment.$id, { content: updatedContent })
                            .then((updatedComment) => {
                              dispatch(updateComment({
                                id: comment.$id,
                                content: updatedContent,
                              }));
                              setEditCommentId(null); // Exit edit mode
                              setUpdatedContent(""); // Clear the updated content
                            })
                            .catch((error) => console.error("Error updating comment:", error));
                        } else {
                          // Enter edit mode
                          setEditCommentId(comment.$id); // Set this comment as the one being edited
                          setUpdatedContent(comment.content); // Set the current content for editing
                        }
                      }}
                    >
                      {isEditing ? "Update" : "Edit"}
                    </Button>
                    <Button
                      onClick={() => {
                        appWriteService.deleteComment(comment.$id);
                        dispatch(removeComment(comment.$id));
                      }}
                      bgColor="bg-red-600"
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default CommentList;
