import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

export const get = async () => {
  const response = await axios.get(URL);
  return response.data;
};

export const post = async (data: any) => {
  const response = await axios.post(URL, data);
  return response.data;
};

export const patch = async (id: number, data: any) => {
  const response = await axios.patch(`${URL}/${id}`, data);
  return response.data;
};

export const del = async (id: number) => {
  await axios.delete(`${URL}/${id}`);
};