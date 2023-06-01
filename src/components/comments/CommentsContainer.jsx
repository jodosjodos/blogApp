import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {v4 as uuidV4} from "uuid"


import { CommentForm } from "./commentForm";
import { getCommentsData } from "../../data/comments";

import { Comment } from "./comment";

export default function CommentsContainer({ className, logginedUSerId }) {
 
  const myUuid=uuidV4()

  const [comments, setComments] = useState([]);

  const mainComments = comments.filter((comment) => comment.parent === null);
  const [affectedComment, setAffectedComment] = useState(null);
 

  useEffect(() => {
    const fetchCommentsData = async () => {
      const commentData = await getCommentsData();
      setComments(commentData);
    };

    fetchCommentsData();
  }, []);

  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    const newComment = {
      _id:myUuid ,
      user: {
        _id: "a",
        name: "Paul M.Williams",
      },
      desc: value,
      post: "1",
      parent: parent,
      replyOnUser: replyOnUser,
      createdAt: new Date().toISOString(),
    };

    setComments((curState) => [newComment, ...curState]);
    setAffectedComment(null);
  };

  // update your commnet
  const updateCommentHandler = (value, commentId) => {
    const updatedComments = comments.map((comment) => {
      if (comment._id == commentId) {
        return { ...comment, desc: value };
      }
      return comment;
    });
    setComments(updatedComments);
    setAffectedComment(null);
  };

  // delete comment
  const deleteCommentHandler = (commentId) => {
    const updatedComments = comments.filter((comment) => {
      return comment._id !== commentId;
    });
    // return updatedComments
    setComments(updatedComments);
  };


  // get replies
  const getRepliesHandler=(commentId)=>{
    return comments.filter((comment)=>  comment.parent===commentId
  ).sort((a,b)=>{
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  })
  }

  return (
    <div className={className}>
      <CommentForm
        btnLabel="Send"
        formSubmitHandler={(value) => addCommentHandler(value)}
      />
      <div className="space-y-4 mt-8">
        {mainComments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            logginedUSerId={logginedUSerId}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            addComment={addCommentHandler}
            updateComment={updateCommentHandler}
            deleteComment={deleteCommentHandler}
            replies={getRepliesHandler(comment._id)}
          />
        ))}
      </div>
    </div>
  );
}

CommentsContainer.propTypes = {
  className: PropTypes.string.isRequired,
  logginedUSerId: PropTypes.string.isRequired,
  affectedComment: PropTypes.string,
};
