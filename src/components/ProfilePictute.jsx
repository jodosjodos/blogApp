import { HiOutlineCamera } from "react-icons/hi";
import PropTypes from "prop-types";
import { stables } from "../constant/stables";
import { CropEasy } from "./crop/cropEasy";
import { useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateProfilePicture } from "../services/index/users";
import { userActions } from "../store/reducers/userReducer";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const ProfilePicture = ({ avatar }) => {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [openCrop, setOpenCrop] = useState(false);
  const [photo, setPhoto] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto({ url: URL.createObjectURL(file), file: file });
    setOpenCrop(true);
  };

  const { mutate } = useMutation({
    mutationFn: ({ token, formData }) => {
      return updateProfilePicture({
        token: token,
        formData: formData,
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      setOpenCrop(false);
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries(["profile"]);
      toast.success("profile photo is  deleted");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const deleteImageHandler = async () => {
    if (window.confirm("Do you want to  delete profile picture")) {
      try {
        const formData = new FormData();
        formData.append("profilePicture", undefined);

        mutate({ token: userState.userInfo.token, formData: formData });
      } catch (err) {
        toast.error(err.message);
        console.log(err);
      }
    }
  };

  return (
    <>
      {openCrop &&
        createPortal(
          <CropEasy photo={photo} setOpenCrop={setOpenCrop} />,
          document.getElementById("portal")
        )}

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
          <input
            type="file"
            name=""
            className="sr-only "
            id="profilePicture"
            onChange={handleFileChange}
          />
        </div>

        <button
          className="px-3 py-1.5 rounded-lg font-semibold border-2 border-red-500 mt-2 hover:bg-red-500 text-white"
          onClick={deleteImageHandler}
        >
          Delete
        </button>
      </div>
    </>
  );
};

ProfilePicture.propTypes = {
  avatar: PropTypes.any,
};
