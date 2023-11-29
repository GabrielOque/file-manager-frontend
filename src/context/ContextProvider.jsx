import { useState, useEffect, useContext, createContext } from "react";
import {
  requestLogin,
  updateRequest,
  requestUsersFaculties,
  requestFaculties,
  requestFiles,
  requestLogout,
  requestToken,
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
      }}
    >
      {children}
    </context.Provider>
  );
};
