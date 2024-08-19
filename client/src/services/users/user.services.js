import { baseURL } from "../../utils/url";
import axios from "axios";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

const token = getUserFromStorage();

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

//! Get All Users
export const getAllUsersAPI = async () => {
  const response = await axios.get(`${baseURL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  //! Return a promise
  return response.data;
};
