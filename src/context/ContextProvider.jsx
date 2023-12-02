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
} from "../api/usersRequest";
const context = createContext();

export const useContextProvider = () => {
  return useContext(context);
};

export const ContextProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState();
  const [userFaculties, setUserFaculties] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [files, setFiles] = useState([]);

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
    setAuthenticated(response.data);
  };

  const getUsersFaculties = async (id) => {
    const response = await requestUsersFaculties(id);
    console.log(response.data);
    setUserFaculties(response.data);
  };

  const getFaculties = async () => {
    const response = await requestFaculties();
    setFaculties(response.data);
  };

  const getFiles = async (idAuthor) => {
    const response = await requestFiles(idAuthor);
    console.log(response.data);
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
    //console.log(response.data);
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

  return (
    <context.Provider
      value={{
        authenticated,
        setAuthenticated,
        userLogin,
        updateUser,
        userFaculties,
        getUsersFaculties,
        faculties,
        getFaculties,
        files,
        getFiles,
        logout,
        verifyToken,
        userRegister,
        createFaculty,
        updateFaculty,
        deleteFaculty,
      }}
    >
      {children}
    </context.Provider>
  );
};
