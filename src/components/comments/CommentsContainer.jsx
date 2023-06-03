import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createNewComment, deleteComment, updateComment } from "../../services/index/comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { CommentForm } from "./commentForm";

import { Comment } from "./comment";

export default function CommentsContainer({
  className,
  logginedUSerId,
  comments,
  postSlug,
}) {
  const queryClient = useQueryClient();
  const [affectedComment, setAffectedComment] = useState(null);
  const userState = useSelector((state) => state.user);

  const { mutate: mutateNewComment, isLoading: isLoadingNewComment } =
    useMutation({
      mutationFn: ({ token, desc, slug, parent, replyOnUser }) => {
        return createNewComment({ token, desc, slug, parent, replyOnUser });
      },
      onSuccess: () => {
        toast.success(
          "your comment is sent successfully , it will be  visible after confirmation of admin"
        );
        queryClient.invalidateQueries(["blog",postSlug])
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  // update comment
  const { mutate: mutateUpdateComment} =
    useMutation({
      mutationFn: ({ token, desc, commentId }) => {
        return updateComment({ token, desc,  commentId });
      },
      onSuccess: () => {
        toast.success(
          "your comment  has been updated successfully , it will be  visible after confirmation of admin"
        );
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });



    // deleteComment 
    const { mutate: mutatedeleteComment} =
    useMutation({
      mutationFn: ({ token, commentId }) => {
        return deleteComment({ token,commentId  });
      },
      onSuccess: () => {
        toast.success(
          "your comment  has been deleted successfully "
        );
        queryClient.invalidateQueries(["blog",postSlug])
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  useEffect(() => {
    setAffectedComment(null);
  }, []);

  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    mutateNewComment({
      desc: value,
      slug: postSlug,
      parent,
      replyOnUser,
      token: userState?.userInfo?.token,
    });
    setAffectedComment(null);
  };

  // update your commnet
  const updateCommentHandler = (value, commentId) => {
    mutateUpdateComment({token:userState?.userInfo?.token,desc:value,commentId})
    setAffectedComment(null);
  };

  // delete comment
  const deleteCommentHandler = (commentId) => {

    mutatedeleteComment({token:userState?.userInfo?.token,commentId})
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
  postSlug: PropTypes.string,
};
