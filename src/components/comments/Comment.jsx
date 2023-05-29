import PropTypes from "prop-types";
import { FiMessageSquare, FiEdit2, FiTrash } from "react-icons/fi";

// files
import { images } from "../../constant/images";

export const Comment = ({ comment, logginedUSerId }) => {
  const isUSerLoggined = Boolean(logginedUSerId);
  const commentBelongsToUSer=logginedUSerId===comment.user._id;

  return (
    <div className="flex flex-nowrap items-start gap-x-3 bg-secondary p-1  rounded-lg">
      <img
        src={images.Profile3}
        alt="user image"
        className="w-9 h-9 object-cover rounded-lg"
      />
      <div className="flex-1 flex-col ">
        <h5 className="font-bold text-white">{comment.user.name}</h5>
        <span className="text-xs text-">
          {new Date(comment.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
          })}
        </span>
        <p className="font-opensas mt-[10px] text-white">{comment.desc}</p>
        <div className="flex items-center gap-x-3 text-white font-robot tex-sm mt-3 mb-3">
          {isUSerLoggined && (
            <button className="flex items-center space-x-2">
              {<FiMessageSquare />}
              <span>Reply</span>
            </button>
          )}
          {
            commentBelongsToUSer && <>
             <button className="flex items-center space-x-2">
            {<FiEdit2 />}
            <span>Edit</span>
          </button>
          <button className="flex items-center space-x-2">
            {<FiTrash />}
            <span>Delete</span>
          </button>
            </>
          }

         
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  logginedUSerId: PropTypes.any.isRequired,
};
