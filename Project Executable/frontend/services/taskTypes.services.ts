import { API_ROUTES } from "../constants/routes";
import { createRoute } from "../utils/routes";
import { GET, PATCH, POST } from "./api";

export const getTaskTypes = () => {
  const url = API_ROUTES.GET_TASKTYPES;
  return GET<undefined, any>(url).then((res) => res);
};

export const postTaskTypes = (payload: any) => {
  const url = API_ROUTES.POST_TASKTYPES;
  return POST<any, any>(url, payload).then((res) => res);
};

export const patchTaskTypes = (payload: any) => {
  const url = createRoute(API_ROUTES.PATCH_TASKTYPES, {
    taskTypeId: payload.taskTypeId,
  });
  return PATCH<any, any>(url, payload).then((res) => res);
};
