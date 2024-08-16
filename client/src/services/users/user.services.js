import { baseURL } from "../../utils/url";
import axios from "axios";

//! Login
export const loginAPI = async ({ username, password }) => {
  const response = await axios.post(`${baseURL}/users/login`, {
    username,
    password,
  });

  //! Return a promise
  return response.data;
};

//! Register
export const registerAPI = async ({ username, password, email }) => {
  const response = await axios.post(`${baseURL}/users/register`, {
    username,
    password,
    email,
  });

  //! Return a promise
  return response.data;
};
