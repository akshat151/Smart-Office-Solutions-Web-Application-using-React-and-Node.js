import { API_ROUTES } from "../constants/routes";
import { createRoute } from "../utils/routes";
import { DELETE, GET, PATCH, POST } from "./api";

export const getMeetings = () => {
  const url = API_ROUTES.GET_MEETINGS;
  return GET<undefined, any>(url).then((res) => res);
};

export const postMeeting = (payload: any) => {
  const url = API_ROUTES.POST_MEETINGS;
  return POST<any, any>(url, payload).then((res) => res);
};

export const patchMeeting = (meetingId: string, payload: any) => {
  const url = createRoute(API_ROUTES.PATCH_MEETINGS, { meetingId });
  return PATCH<any, any>(url, payload).then((res) => res);
};

export const deleteMeeting = (meetingId: string) => {
  const url = createRoute(API_ROUTES.DELETE_MEETINGS, { meetingId });
  return DELETE<any, undefined>(url, {
    data: meetingId,
  }).then((res) => res);
};

export const getMeetingStaff = (meetingId: string) => {
  const url = createRoute(API_ROUTES.GET_MEETING_MEMBERS_STAFF, { meetingId });
  return GET<undefined, any>(url).then((res) => res);
};

export const getMeetingClient = (meetingId: string) => {
  const url = createRoute(API_ROUTES.GET_MEETING_MEMBERS_CLIENT, { meetingId });
  return GET<undefined, any>(url).then((res) => res);
};

export const postMeetingStaff = (payload: any) => {
  const url = createRoute(API_ROUTES.POST_MEETING_MEMBERS_STAFF, {
    meetingId: payload.meetingId,
  });
  return POST<any, any>(url, { staffId: payload.staffId }).then((res) => res);
};

export const postMeetingClient = (payload: any) => {
  const url = createRoute(API_ROUTES.POST_MEETING_MEMBERS_CLIENT, {
    meetingId: payload.meetingId,
  });
  return POST<any, any>(url, { clientId: payload.clientId }).then((res) => res);
};

export const deleteMeetingStaff = (payload: any) => {
  const url = createRoute(API_ROUTES.DELETE_MEETING_MEMBERS_STAFF, {
    meetingId: payload.meetingId,
  });
  return DELETE<any, undefined>(url, { staffId: payload.staffId }).then(
    (res) => res,
  );
};

export const deleteMeetingClient = (payload: any) => {
  const url = createRoute(API_ROUTES.DELETE_MEETING_MEMBERS_CLIENT, {
    meetingId: payload.meetingId,
  });
  return DELETE<any, undefined>(url, { clientId: payload.clientId }).then(
    (res) => res,
  );
};
