import axios from "axios";
import { VITE_API_URL, CREDENTIALS } from "../config/config";

export const requestRegister = async (data) =>
  await axios.post(`${VITE_API_URL}/api/users/`, data, CREDENTIALS);

export const requestLogin = async (data) =>
  await axios.post(`${VITE_API_URL}/api/users/login`, data, CREDENTIALS);

export const updateRequest = async (data) => {
  console.log(data);
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

export const requestUpdateFaculty = async (id, data) =>
  await axios.put(`${VITE_API_URL}/api/faculties/${id}`, data, CREDENTIALS);

export const requestFaculties = async () =>
  await axios.get(`${VITE_API_URL}/api/faculties`, CREDENTIALS);

export const requestFiles = async (idAuthor) =>
  await axios.get(`${VITE_API_URL}/api/files/${idAuthor}`, CREDENTIALS);

export const requestLogout = async () =>
  await axios.post(`${VITE_API_URL}/api/users/logout`, CREDENTIALS);

export const requestToken = async () =>
  await axios.post(`${VITE_API_URL}/api/users/token`, CREDENTIALS);

export const requestCreateFaculty = async (newFaculty) =>
  await axios.post(`${VITE_API_URL}/api/faculties/`, newFaculty, CREDENTIALS);

export const requestDeleteFaculty = async (id) =>
  await axios.delete(`${VITE_API_URL}/api/faculties/${id}`, CREDENTIALS);

export const requestUser = async (id) =>
  await axios.get(`${VITE_API_URL}/api/users/profile/${id}`, CREDENTIALS);

export const requestApproveFile = async (id, data) =>
  await axios.put(`${VITE_API_URL}/api/files/${id}`, data, CREDENTIALS);

export const requestComments = async (id) =>
  await axios.get(`${VITE_API_URL}/api/comments/${id}`, CREDENTIALS);

export const requestCreateComment = async (data) =>
  await axios.post(`${VITE_API_URL}/api/comments/`, data, CREDENTIALS);

export const requestUpdateUploadFile = async (data) => {
  const form = new FormData();
  for (let key in data) {
    form.append(key, data[key]);
  }
  return await axios.post(`${VITE_API_URL}/api/files/`, form, CREDENTIALS);
};

export const requestDeleteFile = async (id) =>
  await axios.delete(`${VITE_API_URL}/api/files/${id}`, CREDENTIALS);

export const requestDeleteUser = async (id) =>
  await axios.delete(`${VITE_API_URL}/api/users/${id}`, CREDENTIALS);
