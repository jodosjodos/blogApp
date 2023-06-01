import PropTypes from "prop-types";
import { BsCheckLg, BsX } from "react-icons/bs";
import { Link } from "react-router-dom";

import { images } from "../../constant/images";
import { stables } from "../../constant/stables";

export const ArticleCard = ({ post }) => {
 
  const user = post.user;
  let profile;
  let postPhoto;
  if (user.avatar === "") {
    profile = images.Profile;
  } else {
    profile = `${stables.UPLOAD_FOLDER_BASE_URL}${user.avatar}`;
  }
  if (post.photo) {
    postPhoto = `${stables.UPLOAD_FOLDER_BASE_URL}${post.photo}`;
  } else {
    postPhoto = images.Sample;
  }
  return (
    <div className="text-white flex flex-col gap-4  p-2">
      <img
        src={`${postPhoto}`}
        alt="article image"
        className=" rounded-3xl h-[80%]"
      />

      <div className="bg-secondary rounded-lg p-5">
        <h1 className=" m-3 font-bold text-xl hover:underline hover:cursor-pointer text-[#279B00]">
          {post.title}
        </h1>
        <p>{post.caption}</p>
        <Link
          className="text-[#279B00]  hover:cursor-pointer hover:underline"
          to={`/blog/${post.slug}`}
        >
          {" "}
          see more....
        </Link>
        <div className=" flex  flex-row  mt-4">
          <div className="flex  items-center gap-2 ">
            <img
              src={`${profile}`}
              alt=""
              className="w-[15%] rounded-full hover:cursor-pointer "
            />
            <div>
              <h4 className="text-[#279B00]  hover:cursor-pointer">
                {user.username}
              </h4>
              <div className="flex mt-2 items-center justify-center gap-2 italic text-xs md:text-sm">
                {post.user.verified ? (
                  <span className="flex items-center rounded-full bg-secondary p-1 font-bold text-2xl">
                    <BsCheckLg
                      color="#279B00"
                      className="h-4 w-4 font-bold text-lg"
                      size={14}
                    />
                  </span>
                ) : (
                  <span className="flex items-center rounded-full bg-secondary p-1">
                    <BsX color="#FF0000" className="h-4 w-4" size={14} />
                  </span>
                )}
                {post.user.verified ? "Verified" : "Unverified"} writer
              </div>
            </div>
          </div>
          <span className=" font-bold p-0 italic text-sm md:text-base">
            {new Date(post.createdAt).getDate()}{" "}
            {new Date(post.createdAt).toLocaleString("default", {
              month: "long",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

ArticleCard.propTypes = {
  post: PropTypes.object,
};
