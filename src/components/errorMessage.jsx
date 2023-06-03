import PropTypes from "prop-types"

export const ErrorMessage = ({ message }) => {
  return (
    <div className="w-full flex items-center rounded-lg text-white bg-red-500 mx-auto px-4 py-2 max-w-md">
      <p>{message}</p>
    </div>
  );
};
ErrorMessage.propTypes={
    message:PropTypes.string
}
