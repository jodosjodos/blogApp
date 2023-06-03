import PropTypes from "prop-types";

export const ArticleCardSkeleton = ({ className }) => {
  return (
    <div className={` ${className}text-white flex flex-col gap-4  p-2 animate-pulse ` }>
      {/* image */}
      <div className="w-full aspect-video bg-slate-600 rounded-lg" />

      <div className="bg-secondary rounded-lg p-5 animate">
        {/* title */}
        <div className="  mt-4 bg-slate-300 rounded-lg" />

        {/* caption */}
        <div className="  mt-4 bg-slate-300 rounded-lg" />

        <div className=" flex  flex-row  mt-4">
          {/* user's name */}
          <div className="   bg-slate-300 rounded-lg" />

          {/* verified status */}
          <div className=" mt-2 w-17 bg-slate-300 rounded-lg" />
          {/* date */}
          <div className="mt-4 w-17 bg-slate-300 rounded-lg" />
        </div>
      </div>
     
    </div>
  );
};

ArticleCardSkeleton.propTypes = {
  className: PropTypes.any,
};
