import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createNewComment } from "../../services/index/comment";
import { useMutation } from "@tanstack/react-query";
import {useSelector} from "react-redux"
import {toast} from "react-hot-toast"


import { CommentForm } from "./commentForm";


import { Comment } from "./comment";

export default function CommentsContainer({
  className,
  logginedUSerId,
  comments,
  postSlug
}) {
  const [affectedComment, setAffectedComment] = useState(null);
  const userState=useSelector(state=>state.user)


  const { mutate: mutateNewComment, isLoading: isLoadingNewComment } =
    useMutation({
      mutationFn: ({ token, desc, slug, parent, replyOnUser }) => {
        return createNewComment({ token, desc, slug, parent, replyOnUser });
      },
      onSuccess:()=>{
        toast.success("your comment is sent successfully , it will be  visible after confirmation of admin")
      },
      onError:(error)=>{
        toast.error(error.message)
        console.log(error);
      }
    });

    useEffect(() => {
      setAffectedComment(null);
    }, []);
    

  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    mutateNewComment({ desc: value, slug:postSlug,parent, replyOnUser ,token:userState?.userInfo?.token});
    setAffectedComment(null)
  };

  // update your commnet
  const updateCommentHandler = (value, commentId) => {
    setAffectedComment(null);
  };

  // delete comment
  const deleteCommentHandler = (commentId) => {
    setAffectedComment(null);
  };

  // console.log(comments);

  // get replies

  return (
    <div className={className}>
      <CommentForm
        btnLabel="Send"
        formSubmitHandler={(value) => addCommentHandler(value)}
        loading={isLoadingNewComment}

      />
      <div className="space-y-4 mt-8">
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            logginedUSerId={logginedUSerId}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            addComment={addCommentHandler}
            updateComment={updateCommentHandler}
            deleteComment={deleteCommentHandler}
            replies={comment.replies}
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
  comments: PropTypes.array,
  postSlug:PropTypes.string
};
