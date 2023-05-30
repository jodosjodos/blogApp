import PropTypes from "prop-types";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaRedditSquare,
  FaWhatsappSquare,
 
  FaLinkedin,
} from "react-icons/fa";
const SocialShareButtons = ({ url, title }) => {
  return (
    <div className="w-full flex justify-between">
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://www.facebook.com/dialog/share?app_id=106671592438295&display=popup&href=${url}`}
      >
        <FaFacebookSquare color="#3b5998 " size={38} />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://twitter.com/intent/tweet?url=${url}`}
      >
        <FaTwitterSquare color="#00acee " size={38} />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://www.reddit.com/submit?url=${url}&title=${title}`}
      >
        <FaRedditSquare color="#ff4500 " size={38} />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://api.whatsapp.com/send/?text=${url}`}
      >
        <FaWhatsappSquare color="#25D366 " size={38} />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}
`}
      >
        <FaLinkedin color="#0077B5 " size={38} />
      </a>
    </div>
  );
};

SocialShareButtons.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
};
export default SocialShareButtons;
