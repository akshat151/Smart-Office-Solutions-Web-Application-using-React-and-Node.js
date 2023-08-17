export const API_ROUTES = {
  GET_CUSTOMERS: "/customers",
  GET_CUSTOMER_DETAILS: "/customers/:customerId",
  POST_CUSTOMER: "/customers",
  PATCH_CUSTOMER: "/customers/:customerId",
  DELETE_CUSTOMER: "/customers/:customerId",

  GET_USERS: "/users",
  GET_USER_DETAILS: "/users/user/:userId",
  POST_USER: "/users/user/signUp",
  POST_LOGIN_USER: "/users/user/login",

  GET_CLIENTS: "/clients",
  POST_CLIENT: "/clients/client",
  PATCH_CLIENT: "/clients/client/:clientId",
  DELETE_CLIENT: "/clients/client/:clientId",

  GET_STAFF: "/staff",
  POST_STAFF: "/staff",
  PATCH_STAFF: "/staff/:staffId",
  DELETE_STAFF: "/staff/:staffId",
  LOGIN_STAFF: "/staff/login",

  GET_TASKS: "/tasks",
  POST_TASKS: "/tasks",
  PATCH_TASKS: "/tasks/:taskId",
  DELETE_TASKS: "/tasks/:taskId",

  GET_TASK_MEMBERS: "/tasks/:taskId/members",
  POST_TASK_MEMBERS: "/tasks/:taskId/members",
  PATCH_TASK_MEMBERS: "/tasks/:taskId/members",
  DELETE_TASK_MEMBERS: "/tasks/:taskId/members",

  GET_ROLES: "/roles",
  POST_ROLES: "/roles",

  GET_TASKTYPES: "/taskTypes",
  POST_TASKTYPES: "/taskTypes/taskType",
  PATCH_TASKTYPES: "/taskTypes/taskType/:taskTypeId",

  GET_MEETINGS: "/meetings",
  POST_MEETINGS: "/meetings",
  PATCH_MEETINGS: "/meetings/:meetingId",
  DELETE_MEETINGS: "/meetings/:meetingId",

  GET_MEETING_MEMBERS_CLIENT: "/meetings/:meetingId/client",
  POST_MEETING_MEMBERS_CLIENT: "/meetings/:meetingId/client",
  DELETE_MEETING_MEMBERS_CLIENT: "/meetings/:meetingId/client",

  GET_MEETING_MEMBERS_STAFF: "/meetings/:meetingId/staff",
  POST_MEETING_MEMBERS_STAFF: "/meetings/:meetingId/staff",
  DELETE_MEETING_MEMBERS_STAFF: "/meetings/:meetingId/staff",

  GET_OFFICE_HOURS: "/officeHours/:staffId",
  POST_OFFICE_HOURS: "/officeHours",
  DELETE_OFFICE_HOURS: "/officeHours/:officeHoursId",
};

export const ROUTES = {
  dashboard: "/app/dashboard",
  home: "/app/home",
  login: "/app/login",
};
