import { baseURL } from "../../utils/url";
import axios from "axios";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

const token = getUserFromStorage();

//! Add Transaction
export const addTransactionAPI = async ({
  type,
  date,
  amount,
  description,
  category,
}) => {
  const response = await axios.post(
    `${baseURL}/transactions/create`,
    { type, date, amount, category, description },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

//! Update Transaction
export const updateTransactionAPI = async ({
  id,
  type,
  date,
  amount,
  description,
  category,
}) => {
  const response = await axios.put(
    `${baseURL}/transactions/update/${id}`,
    { type, date, amount, description, category },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

//! Delete Transaction
export const deleteTransactionAPI = async (id) => {
  const response = await axios.delete(`${baseURL}/transactions/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
