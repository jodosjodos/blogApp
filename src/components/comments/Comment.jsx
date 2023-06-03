import PropTypes from "prop-types";
import { FiMessageSquare, FiEdit2, FiTrash } from "react-icons/fi";

// files
import { images } from "../../constant/images";
import { CommentForm } from "./commentForm";
import {stables} from "../../constant/stables"

export const Comment = ({
  comment,
  logginedUSerId,
  affectedComment,
  setAffectedComment,
  addComment,
  parentId = null,
  updateComment,
  deleteComment,
  replies
 
}) => {
  const isUSerLoggined = Boolean(logginedUSerId);
  const commentBelongsToUSer = logginedUSerId === comment.user._id;
  const isReplying =
    affectedComment &&
    affectedComment.type == "replying" &&
    affectedComment.id == comment._id;
  const isEditing =
    affectedComment &&
    affectedComment.type == "editing" &&
    affectedComment.id == comment._id;

  const repliedCommentId = parentId ? parentId : comment._id;

  const replyOnUserId = comment.user._id;


  return (
    <div className={`flex flex-col flex-nowrap items-start gap-x-3 bg-secondary p-3   ${
      parentId ? 'replyComment' : ''
    }  rounded-lg ${comment.check}`}>
      <img
        src={comment?.user?.avatar ? stables.UPLOAD_FOLDER_BASE_URL+comment.user.avatar : images.Profile}
        alt="user image"
        className="w-[35px] h-[35px] object-cover rounded-lg mb-6"
      />
      <div className="flex-1 flex-col  ">
        <h5 className="font-bold text-white lg:text-sm">{comment?.user?.username}</h5>
        <span className="text-xs text-medium">
          {new Date(comment?.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
          })}
        </span>

        {
          !isEditing &&(
            <>
              <p className="font-opensas mt-[10px] text-white ">
                {comment.desc}
              </p>
            </>
          )
        }
        {isEditing && (
          <CommentForm
            btnLabel="Update"
            formSubmitHandler={(value) => updateComment(value, comment._id)}
            formCancelHandler={()=>setAffectedComment(null)}
            initialText={comment.desc}
          />
        )}
        <div className="flex items-center gap-x-3 text-white font-robot tex-sm mt-3 mb-3">
          {isUSerLoggined && (
            <button
              className="flex items-center space-x-2"
              onClick={() => {
                return setAffectedComment({
                  type: "replying",
                  id: comment._id,
                });
              }}
            >
              {<FiMessageSquare />}
              <span>Reply</span>
            </button>
          )}
          {commentBelongsToUSer && (
            <>
              <button
                className="flex items-center space-x-2"
                onClick={() =>
                  setAffectedComment({ type: "editing", id: comment._id })
                }
              >
                {<FiEdit2 />}
                <span>Edit</span>
              </button>
              <button className="flex items-center space-x-2"
               onClick={()=>deleteComment(comment._id)}
               >
                {<FiTrash />}
                <span>Delete</span>
              </button>
            </>
          )}
        </div>
      </div>
      {isReplying && (
        <>
          <CommentForm
            btnLabel="Reply"
            formSubmitHandler={(value) =>
              addComment(value, repliedCommentId, replyOnUserId)
            }
            formCancelHandler={() => setAffectedComment(null)}
          />
        </>
      )}
      {
      
       replies && replies.length >0 && (
          <div>
            {replies?.map((reply)=>{
              console.log(reply);
              return (
              <Comment
               key={reply._id}
               addComment={addComment}
               affectedComment={affectedComment}
               setAffectedComment={setAffectedComment}
               comment={reply}
               deleteComment={deleteComment}
               updateComment={updateComment}
               logginedUSerId={logginedUSerId}
               replies={[]}
               parentId={comment._id}
              />
              )
            })}
          </div>
        )
      }
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  logginedUSerId: PropTypes.any.isRequired,
  affectedComment: PropTypes.object,
  setAffectedComment: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  parentId: PropTypes.string,
  updateComment: PropTypes.func,
  deleteComment:PropTypes.func,
  replies:PropTypes.array
  
};
