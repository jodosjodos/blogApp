import { useState } from "react";
import PropTypes from 'prop-types';


export const CommentForm = ({btnLabel,formSubmitHandler}) => {
  const [value, setValue] = useState("");
  const submitHandler = (e) => {
      e.preventDefault();
      console.log(value );
    formSubmitHandler(value)
    setValue("")
  };
  
  return (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col items-start border- border-primary rounded-lg p-4">
        <textarea
          rows="5"
          cols="27"
          className="w-full focus:outline-none  text-primary rounded"
          placeholder="leave your comment here....."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
   <button
  type="submit"
  className="px-6 py-2.5 rounded-lg font-semibold border-2 border-[#279B00] mt-2 hover:bg-primary"
>
  {btnLabel}
</button>


      </div>
    </form>
  );    
};

CommentForm.propTypes = {
  btnLabel: PropTypes.string.isRequired,
  formSubmitHandler: PropTypes.func.isRequired,
};
