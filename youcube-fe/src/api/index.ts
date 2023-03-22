import axios, { AxiosResponse } from "axios";
import { GlobalVars } from "GlobalVars";

const api = axios.create({
  baseURL: GlobalVars.API_ENDPOINT,
});

api.interceptors.response.use(
  (response) => {
    handleError(response);
    return response;
  },
  (error) => {
    handleError(error.response);
    return Promise.reject(error);
  }
);

const handleError = (response: AxiosResponse) => {
  if (
    response.config.url !== "/is-authenticated" &&
    response.config.url !== "/login" &&
    response &&
    response.data &&
    response.data.error &&
    response.data.error.description
  ) {
    alert(response.data.error.description);
  }
};

export default api;
