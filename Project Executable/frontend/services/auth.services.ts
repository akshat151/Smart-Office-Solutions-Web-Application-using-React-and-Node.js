import { API_ROUTES } from "../constants/routes";
import { axiosInstance, POST } from "./api";

export const loginUser = (payload: any) => {
  const url = API_ROUTES.LOGIN_STAFF;
  // return axiosInstance.post(url, payload).then((res) => res.data);
  return POST<any, any>(url, payload).then((res) => res);
};
