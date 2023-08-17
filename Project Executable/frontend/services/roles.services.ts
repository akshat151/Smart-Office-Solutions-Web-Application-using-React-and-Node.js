import { API_ROUTES } from "../constants/routes";
import { GET, POST } from "./api";

export const getRoles = () => {
  const url = API_ROUTES.GET_ROLES;
  return GET<undefined, any>(url).then((res) => res);
};

export const postRoles = (payload: any) => {
  const url = API_ROUTES.POST_ROLES;
  return POST<any, any>(url, payload).then((res) => res);
};
