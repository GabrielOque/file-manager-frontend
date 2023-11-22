import axios from "axios";
import { VITE_API_URL, CREDENTIALS } from "../config/config";

export const requestLogin = async (data) =>
  await axios.post(`${VITE_API_URL}/api/users/login`, data, CREDENTIALS);

export const updateRequest = async (data) => {
  const form = new FormData();
  for (let key in data) {
    form.append(key, data[key]);
  }
  return await axios.put(
    `${VITE_API_URL}/api/users/${data._id}`,
    form,
    CREDENTIALS
  );
};

export const requestUsersFaculties = async (id) =>
  await axios.get(
    `${VITE_API_URL}/api/users/faculties/?faculty=${id}`,
    CREDENTIALS
  );

export const requestFaculties = async () =>
  await axios.get(`${VITE_API_URL}/api/faculties`, CREDENTIALS);

export const requestFiles = async (idAuthor) =>
  await axios.get(`${VITE_API_URL}/api/files/${idAuthor}`, CREDENTIALS);

export const requestLogout = async () =>
  await axios.post(`${VITE_API_URL}/api/users/logout`, CREDENTIALS);
