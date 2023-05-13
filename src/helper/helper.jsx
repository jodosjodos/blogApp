import axios from "axios";

axios.defaults.baseURL="http://localhost:3000"

export const authenticate = async (username) => {
  try {
    return await axios.post("api/authenticate", { username });
  } catch (err) {
    return { err: err };
  }
};

// get data or single user

export const getUser = async ({ username }) => {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return { data };
  } catch (err) {
    return { err: err };
  }
};

export const registerUser = async (credentials) => {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post("/api/register", credentials);

    let { username, email } = credentials;

    //  send email
    if (status === 201) {
      // await axios.post("/api/registerMail", {
      //   username,
      //   userEmail: email,
      //   text: msg,
      // });
      console.log(username,email);
    }
    return msg;
  } catch (err) {
    
    return { err: err };
  }
};

// login function

export const verifyPassword = async ({ username, password }) => {
  try {
    if (username) {
      const { data } = await axios.post("/api/login", { username, password });
      return Promise.resolve(data);
    }
  } catch (err) {
    return { err: err };
  }
};

// upddate user
export const updateUser = async (response) => {
  try {
    const token = await localStorage.getItem("token");
    const data = await axios.put("/api/updateuser", response, {
      headers: { Authorization: `Beare ${token}` },
    });
    return Promise.resolve({ data });
  } catch (err) {
    return Promise.reject({ err: err });
  }
};

// generate OTP

export const generateOTP = async (username) => {
  try {
    const {
      data: { code },
      status,
    } = await axios.get("/api/generateOTP", { params: { username } });

    //  send mail with OTP
    if (status === 201) {
      let {
        data: { email },
      } = await getUser({ username });
      let text = `your password recovering OTP IS ${code} `;
      let subject = "password recovering";
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text,
        subject,
      });
    }

    return Promise.resolve(code);
  } catch (err) {
    return Promise.reject({ err: err });
  }
};

// verify OTP

export const verifyOTP = async ({ username, code }) => {
  try {
    const { data, status } = await axios.get("/api/verifyOTP", {
      params: { username, code },
    });
    return { data, status };
  } catch (err) {
    return Promise.reject({ err: err });
  }
};

export const resetPassword = async ({ username, password }) => {
  try {
    const { data, status } = await axios.put("/api/resetPassword", {
      username,
      password,
    });
    return Promise.resolve({ data, status });
  } catch (err) {
    return Promise.reject({ err: err });
  }
};
