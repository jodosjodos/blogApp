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


// update comment
export const updateComment = async ({
  token,
  desc,
commentId
}) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // console.log(desc);
    const { data } = await axios.put(`http://localhost:4000/api/comments/${commentId}`, {
      desc
    },config);
  
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};


// delete comment
export const deleteComment = async ({
  token,
  
commentId
}) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // console.log(desc);
    const { data } = await axios.delete(`http://localhost:4000/api/comments/${commentId}` ,config);
  
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
