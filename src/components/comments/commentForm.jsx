import { useState } from "react";
import PropTypes from "prop-types";

export const CommentForm = ({
  btnLabel,
  formSubmitHandler,
  formCancelHandler = null,
  initialText="",
  loading=false
}) => {
  const [value, setValue] = useState(initialText);
  const submitHandler = (e) => {
    e.preventDefault();
  
    formSubmitHandler(value);
    setValue("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col items-start border- border-primary rounded-lg p-4">
        <textarea
          rows="5"
          cols="27"
          className="w-full focus:outline-none  text-primary rounded  bg-secondary p-2"
          placeholder="leave your comment here....."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
        <div className="flex items-center gap-x-2 pt-2">
          {formCancelHandler && (
            <button
              className="px-6 py-2.5 rounded-lg font-semibold border-2 border-red-500 mt-2 hover:bg-red-500"
              onClick={formCancelHandler}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg font-semibold border-2 border-[#279B00] mt-2 hover:bg-primary disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={loading}
            // onClick={formCancelHandler}
          >
            {btnLabel}
          </button>
        </div>
      </div>
    </form>
  );
};

CommentForm.propTypes = {
  btnLabel: PropTypes.string.isRequired,
  formSubmitHandler: PropTypes.func.isRequired,
  formCancelHandler: PropTypes.func,
  initialText:PropTypes.string,
  loading:PropTypes.bool
};
