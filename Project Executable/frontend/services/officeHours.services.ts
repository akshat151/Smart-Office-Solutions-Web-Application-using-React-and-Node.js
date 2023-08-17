import { API_ROUTES } from "../constants/routes";
import { createRoute } from "../utils/routes";
import { DELETE, GET, PATCH, POST } from "./api";

export const getOfficeHours = (staffId: string) => {
  const url = createRoute(API_ROUTES.GET_OFFICE_HOURS, { staffId });
  return GET<undefined, any>(url).then((res) => res);
};

export const postOfficeHours = (payload: any) => {
  const url = API_ROUTES.POST_OFFICE_HOURS;
  return POST<any, any>(url, payload).then((res) => res);
};

export const deleteOfficeHours = (officeHoursId: string) => {
  const url = createRoute(API_ROUTES.DELETE_OFFICE_HOURS, { officeHoursId });
  return DELETE<any, undefined>(url, {
    data: officeHoursId,
  }).then((res) => res);
};
