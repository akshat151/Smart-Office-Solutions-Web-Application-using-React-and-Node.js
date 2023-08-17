import { API_ROUTES } from "../constants/routes";
import { createRoute } from "../utils/routes";
import { DELETE, GET, PATCH, POST } from "./api";

export const getClients = () => {
  const url = API_ROUTES.GET_CLIENTS;
  return GET<undefined, any>(url).then((res) => res);
};

export const postClient = (payload: any) => {
  const url = API_ROUTES.POST_CLIENT;
  return POST<any, any>(url, payload).then((res) => res);
};

export const patchClient = (payload: any) => {
  const url = createRoute(API_ROUTES.PATCH_CLIENT, {
    clientId: payload.clientId,
  });
  console.log("URL: ", url);

  return PATCH<any, any>(url, payload).then((res) => res);
};

export const deleteClient = (clientId: string) => {
  const url = createRoute(API_ROUTES.DELETE_CLIENT, { clientId });
  return DELETE<any, undefined>(url, {
    data: clientId,
  }).then((res) => res);
};
