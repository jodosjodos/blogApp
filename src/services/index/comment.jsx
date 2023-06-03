import axios from "axios";

export const createNewComment = async ({
  token,
  desc,
  slug,
  parent,
  replyOnUser,
}) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // console.log(desc);
    const { data } = await axios.post("http://localhost:4000/api/comments", {
      desc,
      slug,
      parent,
      replyOnUser,
    },config);
    console.log(data);
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
