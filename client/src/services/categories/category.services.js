import { baseURL } from "../../utils/url";
import axios from "axios";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

const token = getUserFromStorage();

//! Add Category
export const addCategoryAPI = async ({ type, name }) => {
  const response = await axios.post(
    `${baseURL}/categories/create`,
    { type, name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

//! Update Category
export const updateCategoryAPI = async ({ id, type, name }) => {
  const response = await axios.put(
    `${baseURL}/categories/update/${id}`,
    { type, name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

//! Delete Category
export const deleteCategoryAPI = async (id) => {
  const response = await axios.delete(`${baseURL}/categories/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//! Get All Categories
export const getAllCategoriesAPI = async () => {
  const response = await axios.get(`${baseURL}/categories/lists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
