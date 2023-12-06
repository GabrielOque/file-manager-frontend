import { useState, useEffect, useContext, createContext } from "react";
import {
  requestLogin,
  updateRequest,
  requestUsersFaculties,
  requestFaculties,
  requestFiles,
  requestLogout,
  requestToken,
  requestRegister,
  requestCreateFaculty,
  requestUpdateFaculty,
  requestDeleteFaculty,
  requestUser,
  requestApproveFile,
  requestComments,
  requestCreateComment,
  requestUpdateUploadFile,
  requestDeleteFile,
} from "../api/usersRequest";
import { get, set } from "react-hook-form";
const context = createContext();

export const useContextProvider = () => {
  return useContext(context);
};

export const ContextProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState();
  const [userFaculties, setUserFaculties] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [files, setFiles] = useState([]);
  const [user, setUser] = useState();
  const [comments, setComments] = useState([]);

  const userRegister = async (dataUser) => {
    const response = await requestRegister(dataUser);
    setUserFaculties([...userFaculties, response.data]);
  };

  const userLogin = async (data) => {
    const response = await requestLogin(data);
    setAuthenticated(response.data);
  };

  const updateUser = async (data) => {
    const response = await updateRequest(data);
    // console.log("hola", response.data);
    setAuthenticated(response.data);
  };

  const getUsersFaculties = async (id) => {
    const response = await requestUsersFaculties(id);
    // console.log(response.data);
    setUserFaculties(response.data);
  };

  const getFaculties = async () => {
    const response = await requestFaculties();
    setFaculties(response.data);
  };

  const getFiles = async (idAuthor) => {
    const response = await requestFiles(idAuthor);
    // console.log(response.data);
    setFiles(response.data);
  };

  const logout = async () => {
    await requestLogout();
    setAuthenticated("");
  };

  const verifyToken = async () => {
    const response = await requestToken();
    return response.data;
  };

  const createFaculty = async (data) => {
    const response = await requestCreateFaculty(data);
    // console.log(response.data);
    setFaculties([...faculties, response.data]);
  };

  const updateFaculty = async (id, data) => {
    const response = await requestUpdateFaculty(id, data);
    setFaculties(
      faculties.map((item) => (item._id === id ? response.data : item))
    );
  };

  const deleteFaculty = async (id) => {
    await requestDeleteFaculty(id);
    setFaculties(faculties.filter((item) => item._id !== id));
  };

  const getUser = async (id) => {
    const response = await requestUser(id);
    setUser(response.data);
  };

  const updateStatus = async (id, status) => {
    const response = await requestApproveFile(id, status);
    // console.log(response.data);
    setFiles(files.map((item) => (item._id === id ? response.data : item)));
  };

  const getComments = async (id) => {
    const response = await requestComments(id);
    // console.log(response.data);
    setComments(response.data);
  };

  const createComment = async (data) => {
    const response = await requestCreateComment(data);
    // console.log(response.data);
    setComments([...comments, response.data]);
  };

  const uploadFile = async (data) => {
    const response = await requestUpdateUploadFile(data);
    // console.log(response.data);
    setFiles([...files, response.data]);
  };

  const deleteFile = async (id) => {
    await requestDeleteFile(id);
    setFiles(files.filter((item) => item._id !== id));
  };

  return (
    <context.Provider
      value={{
        authenticated,
        setAuthenticated,
        userLogin,
        updateUser,
        userFaculties,
        setUserFaculties,
        getUsersFaculties,
        faculties,
        setFaculties,
        getFaculties,
        files,
        setFiles,
        getFiles,
        logout,
        verifyToken,
        userRegister,
        createFaculty,
        updateFaculty,
        deleteFaculty,
        user,
        getUser,
        updateStatus,
        comments,
        getComments,
        createComment,
        uploadFile,
        deleteFile,
      }}
    >
      {children}
    </context.Provider>
  );
};
