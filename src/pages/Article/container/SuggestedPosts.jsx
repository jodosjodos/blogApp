import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { stables } from "../../../constant/stables";
import { images } from "../../../constant/images";

function SuggestedPosts({ className, header, posts = [], tags }) {
  // console.log(posts.image);
  return (
    <div
      className={` w-full shoadow-[rgba(7,_65,_210,_0.1) _0px_9px_30px] rounded-lg p-4 ${className}  `}
    >
      <h2 className="font-roboto font-medium text-primary md:text-xl">
        {header}
      </h2>
      <div className="grid gap-y-5 mt-5 grid-cols-2 gap-x-20 lg:grid-cols-1">
        {posts.map((item) => {
          return (
            <div
              key={item._id}
              className="flex  flex-col space-x-3 flex-nowrap items-center md:flex-row"
            >
              <img
                src={
                  item?.photo
                    ? stables.UPLOAD_FOLDER_BASE_URL + item?.photo
                    : images.Sample
                }
                alt="item titlte"
                className="aspect-square object-cover rounded-lg w-[100px] "
              />
              <div>
                <h3 className="text-sm font-robot text-white md:text-base font-medium lg:text-lg">
                  <Link to={`/blog/${item.slug}`}>{item.title}</Link>
                </h3>
                <span className="text-xs opacity-60">
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <h2 className="font-medium text-white mt-8 md:text-lg">Tags</h2>
      {tags.length === 0 ? (
        <p className="text-slate-500 text-xs">
          {" "}
          there is no tags avaliable for this post
        </p>
      ) : (
        <div className="flex flex-wrap gap-x-2 gap-y-2 mt-4">
          {tags.map((tag) => {
            return (
              <Link
                to="/"
                className="inline-block rounded-md px-3 py-1.5 bg-primary font-robot text-xs text-white md:text-sm"
                key={tag}
              >
                {tag}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

SuggestedPosts.propTypes = {
  className: PropTypes.string,
  header: PropTypes.string,
  posts: PropTypes.object,
  tags: PropTypes.array,
};

export default SuggestedPosts;
