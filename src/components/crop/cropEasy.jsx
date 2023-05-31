import Cropper from "react-easy-crop";
import Proptypes from "prop-types";
import { useState } from "react";
import getCroppedImg from "./cropImage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfilePicture } from "../../services/index/users";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/userReducer";
import { toast } from "react-hot-toast";
export const CropEasy = ({ photo, setOpenCrop }) => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const userState = useSelector((state) => state.user);
  
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  
    // handle crop complety
    const handleCropComplete = (cropedArea, crepedAreaPixels) => {
      setCroppedAreaPixels(crepedAreaPixels);
    };
  
    const { mutate, isLoading } = useMutation({
      mutationFn: ({ token, formData }) => {
        return updateProfilePicture({
          token: token,
          formData: formData,
        });
      },
      onSuccess: (data) => {
        dispatch(userActions.setUserInfo(data));
        setOpenCrop(false)
        localStorage.setItem("account", JSON.stringify(data));
        queryClient.invalidateQueries(["profile"]);
        toast.success("profile photo is updated");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });
  
    const handleCropImage = async () => {
      try {
        const croppedImage = await getCroppedImg(photo.url, croppedAreaPixels);
        const file = new File([croppedImage.file], `${photo?.file?.name}`, {
          type: photo?.file?.type,
        });
  
        const formData = new FormData();
        formData.append("profilePicture", file);
  
        mutate({ token: userState.userInfo.token, formData: formData });
      } catch (err) {
        toast.error(err.message);
        console.log(err);
      }
    };
  return (
    <div className="fixed x-[1000] inset-0 bg-secondary flex justify-center p-5 overflow-auto">
      <div className=" bg-black text-white h-fit w-full sm:max-w-[350px] p-5 rounded-lg">
        <h2 className=" font-semibold text-white mb-2">Crop Image</h2>
        <div className=" relative w-full aspect-square rounded-lg overflow-hidden">
          <Cropper
            image={photo?.url}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onZoomChange={setZoom}
            onCropChange={setCrop}
            onCropComplete={handleCropComplete}
          />
        </div>
        <div>
          <label
            htmlFor="zoomRange"
            className="block mt-2 mb-0.5 tex-sm font-medium text-white"
          >
            {" "}
            Zoom : {`${Math.round(zoom * 100)}%`}
          </label>
          <input
            type="range"
            id="zoomRange"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
            className="w-full mb-6 bg-secondary rounded-lg appearance-none bg-white cursor-pointer range-sm"
          />
        </div>
        <div className=" flex justify-between gap-2 flex-wrap">
          <button className="px-3 py-1.5 rounded-lg font-semibold border-2 border-red-500 mt-2 hover:bg-red-500 text-white disabled:opacity-70" onClick={()=>setOpenCrop(false)}
          disabled={isLoading}
          >
            Cancel
          </button>
          <button className="px-3 py-1.5 rounded-lg font-semibold border-2 border-red-500 mt-2 hover:bg-red-500 text-white disabled:opacity-70"
          disabled={isLoading}
          onClick={handleCropImage}
          
          >
            Crop & upload
          </button>
        </div>
      </div>
    </div>
  );
};

CropEasy.propTypes = {
  photo: Proptypes.object,
  setOpenCrop: Proptypes.func,
};
