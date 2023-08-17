import { API_ROUTES } from "../constants/routes";
import { createRoute } from "../utils/routes";
import { DELETE, GET, PATCH, POST } from "./api";

export const getStaff = () => {
  const url = API_ROUTES.GET_STAFF;
  return GET<undefined, any>(url).then((res) => res);
};

export const postStaff = (payload: any) => {
  const url = API_ROUTES.POST_STAFF;
  return POST<any, any>(url, payload).then((res) => res);
};

export const patchStaff = (payload: any) => {
  const url = createRoute(API_ROUTES.PATCH_STAFF, {
    staffId: payload.staffId,
  });

  return PATCH<any, any>(url, payload).then((res) => res);
};

export const deleteStaff = (staffId: string) => {
  const url = createRoute(API_ROUTES.DELETE_STAFF, { staffId });
  return DELETE<any, undefined>(url, {
    data: staffId,
  }).then((res) => res);
};
