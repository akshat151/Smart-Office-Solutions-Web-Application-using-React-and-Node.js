import { API_ROUTES } from "../constants/routes";
import { createRoute } from "../utils/routes";
import { DELETE, GET, PATCH, POST } from "./api";

export const getTasks = () => {
  const url = API_ROUTES.GET_TASKS;
  return GET<undefined, any>(url).then((res) => res);
};

export const postTask = (payload: any) => {
  const url = API_ROUTES.POST_TASKS;
  return POST<any, any>(url, payload).then((res) => res);
};

export const patchTask = (taskId: string, payload: any) => {
  const url = createRoute(API_ROUTES.PATCH_TASKS, { taskId });
  return PATCH<any, any>(url, payload).then((res) => res);
};

export const deleteTask = (taskId: string) => {
  const url = createRoute(API_ROUTES.DELETE_TASKS, { taskId });
  return DELETE<any, undefined>(url, {
    data: taskId,
  }).then((res) => res);
};
