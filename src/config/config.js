import axios from "axios";

axios.defaults.withCredentials = true;
export const VITE_API_URL = import.meta.env.VITE_API_URL;
export const ROLES = {
  ADMIN: "Admin",
  SUPER_ADMIN: "SuperAdmin",
  USER: "User",
};

export const CREDENTIALS = {
  withCredentials: true,
};

export const MESSAGE = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
  DEFAULT: "default",
  LOADING: "loading",
  INVALID_TOKEN: "No hay token",
};
