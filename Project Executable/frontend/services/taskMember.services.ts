import { API_ROUTES } from "../constants/routes";
import { createRoute } from "../utils/routes";
import { DELETE, GET, PATCH, POST } from "./api";

export const getTaskMembers = (taskId: string) => {
  const url = createRoute(API_ROUTES.DELETE_TASK_MEMBERS, { taskId });
  return GET<undefined, any>(url).then((res) => res);
};

export const postTaskMember = (payload: any) => {
  const url = createRoute(API_ROUTES.DELETE_TASK_MEMBERS, {
    taskId: payload.taskId,
  });
  return POST<any, any>(url, { staffId: payload.staffId }).then((res) => res);
};

export const deleteTaskMember = (payload: any) => {
  const url = createRoute(API_ROUTES.DELETE_TASK_MEMBERS, {
    taskId: payload.taskId,
  });
  return DELETE<any, undefined>(url, { staffId: payload.staffId }).then(
    (res) => res,
  );
};
