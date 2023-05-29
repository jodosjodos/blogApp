import { CommentForm } from "./commentForm";
import { getCommentsData } from "../../data/comments";

import  { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import {Comment} from "./comment";

export default function CommentsContainer({ className,logginedUSerId }) {
  const [comments, setComments] = useState([]);

  const mainComments = comments.filter((comment) => comment.parent === null);

  console.log(comments);

  useEffect(() => {
    const fetchCommentsData = async () => {
      const commentData = await getCommentsData();
      setComments(commentData);
    };

    fetchCommentsData();
  }, []);

  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    const newComment = {
      _id: "11",
      user: {
        _id: "b",
        name: "Paul M.Williams",
      },
      desc: value,
      post: "1",
      parent: parent,
      replyOnUser: replyOnUser,
      createdAt: "2022-12-31T17:22:05.092+0000",
    };

    setComments((curState) => [newComment, ...curState]);
  };

  return (
    <div className={className}>
      <CommentForm
        btnLabel="Send"
        formSubmitHandler={(value) => addCommentHandler(value)}
      />
      <div className="space-y-4 mt-8">
        {mainComments.map((comment) => (
          <Comment key={comment._id} comment={comment} logginedUSerId={logginedUSerId} />
        ))}
      </div>
    </div>
  );
}

CommentsContainer.propTypes = {
  className: PropTypes.string.isRequired,
  logginedUSerId:PropTypes.string.isRequired
};
