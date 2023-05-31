import axios from "axios";


export const getUserProfile = async ({ token }) => {
  try {
    const config={
      headers:{
        Authorization:`Bearer ${token}`

      }
    }

    const {data} =await axios.get("http://localhost:4000/api/user/profile",config)
      return data
  } catch (error) {
    if (error.response && error.response.data.message)
    throw new Error(error.response.data.message);
  throw new Error(error.message);
}
  }


  export const updateProfile = async ({ token,userData}) => {
    try {
      const config={
        headers:{
          Authorization:`Bearer ${token}`
  
        }
      }
  
      const {data} =await axios.put("http://localhost:4000/api/user/updateProfile",userData,config)
     
        return data
    } catch (error) {
      if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
    }


    export const updateProfilePicture = async ({ token,formData}) => {
      try {
        const config={
          headers:{
            "Content-Tyoe":"multipart/form-data",
            Authorization:`Bearer ${token}`
    
          }
        }
    
        const {data} =await axios.put("http://localhost:4000/api/user/updateProfilePicture",formData,config)
       
          return data
      } catch (error) {
        if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      throw new Error(error.message);
    }
      }

  
