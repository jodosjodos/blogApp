import { HiOutlineCamera } from "react-icons/hi";
import PropTypes from "prop-types";
import { stables } from "../constant/stables";

export const ProfilePicture = ({ avatar }) => {
  return (
    <div className="w-full flex flex-row justify-center gap-10 items-center mb-5">
      <div className="relative w-32 h-32 rounded-full bg-gray-200">
        <label htmlFor="profilePicture">
          {avatar ? (
            <img
              src={stables.UPLOAD_FOLDER_BASE_URL + avatar}
              alt="profile"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full  p-5 flex justify-center items-center">
              <HiOutlineCamera size={24} className="text-primary " />
            </div>
          )}
        </label>
        <input type="file" name="" className="sr-only" id="profilePicture" />
      </div>

      <button className="px-3 py-1.5 rounded-lg font-semibold border-2 border-red-500 mt-2 hover:bg-red-500 text-white">
        Delete
      </button>
    </div>
  );
};

ProfilePicture.propTypes = {
  avatar: PropTypes.any,
};
