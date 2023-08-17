import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { QUERY_KEYS } from "../constants/queryKeys";
import {
  deleteMeeting,
  deleteMeetingClient,
  deleteMeetingStaff,
  getMeetingClient,
  getMeetings,
  getMeetingStaff,
  patchMeeting,
  postMeeting,
  postMeetingClient,
  postMeetingStaff,
} from "../services/meeting.services";

export const useGetMeetings = () => {
  const { data, isLoading, isFetching, refetch } = useQuery(
    [QUERY_KEYS.GET_MEETINGS, localStorage.getItem("user_id")],
    () => getMeetings(),
    {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchInterval: 1000,
    },
  );
  const modData = (data || []).map((p: any) => ({
    ...p,
    time: p.time ? new Date(p.time).toISOString().slice(0, 10) : null,
  }));
  return { data: modData, isLoading: isLoading || isFetching, refetch };
};

export const usePostMeeting = () => {
  const { refetch } = useQuery([
    QUERY_KEYS.GET_MEETINGS,
    localStorage.getItem("user_id"),
  ]);
  return useMutation(
    (payload: any) => {
      return postMeeting(payload);
    },
    {
      onSuccess: (data, variables) => refetch(),
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.message ||
            err?.message ||
            "Something went wrong!",
        );
      },
    },
  );
};

export const usePatchMeeting = () => {
  const { refetch } = useQuery([
    QUERY_KEYS.GET_MEETINGS,
    localStorage.getItem("user_id"),
  ]);
  return useMutation(
    (payload: any) => {
      console.log(payload);
      return patchMeeting(payload.meetingId, payload);
    },
    {
      onSuccess: (data, variables) => refetch(),
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.message ||
            err?.message ||
            "Something went wrong!",
        );
      },
    },
  );
};

export const useDeleteMeeting = () => {
  const { refetch } = useQuery([
    QUERY_KEYS.GET_MEETINGS,
    localStorage.getItem("user_id"),
  ]);
  return useMutation(
    (meetingId: string) => {
      return deleteMeeting(meetingId);
    },
    {
      onSuccess: (data, variables) => refetch(),
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.message ||
            err?.message ||
            "Something went wrong!",
        );
      },
    },
  );
};

export const useGetStaffInMeetings = (meetingId: string) => {
  const { data, isLoading, isFetching, refetch } = useQuery(
    QUERY_KEYS.GET_MEETING_STAFF,
    () => getMeetingStaff(meetingId),
    { refetchOnMount: true },
  );
  return { data, isLoading: isLoading || isFetching, refetch };
};

export const useGetClientInMeetings = (meetingId: string) => {
  const { data, isLoading, isFetching, refetch } = useQuery(
    QUERY_KEYS.GET_MEETING_CLIENT,
    () => getMeetingClient(meetingId),
    { refetchOnMount: true },
  );
  return { data, isLoading: isLoading || isFetching, refetch };
};

export const usePostStaffInMeetings = () => {
  const { refetch } = useQuery(QUERY_KEYS.GET_MEETING_STAFF);
  const { refetch: refetchMeeting } = useQuery([
    QUERY_KEYS.GET_MEETINGS,
    localStorage.getItem("user_id"),
  ]);

  return useMutation(
    (payload: any) => {
      return postMeetingStaff(payload);
    },
    {
      onSuccess: (data, variables) => {
        refetch();
        refetchMeeting();
      },
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.message ||
            err?.message ||
            "Something went wrong!",
        );
      },
    },
  );
};

export const usePostClientInMeetings = () => {
  const { refetch } = useQuery(QUERY_KEYS.GET_MEETING_CLIENT);
  const { refetch: refetchMeeting } = useQuery([
    QUERY_KEYS.GET_MEETINGS,
    localStorage.getItem("user_id"),
  ]);

  return useMutation(
    (payload: any) => {
      return postMeetingClient(payload);
    },
    {
      onSuccess: (data, variables) => {
        refetch();
        refetchMeeting();
      },
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.message ||
            err?.message ||
            "Something went wrong!",
        );
      },
    },
  );
};

export const useDeleteStaffMeeting = () => {
  const { refetch } = useQuery(QUERY_KEYS.GET_MEETING_STAFF);
  const { refetch: refetchTask } = useQuery([
    QUERY_KEYS.GET_MEETINGS,
    localStorage.getItem("user_id"),
  ]);
  return useMutation(
    (payload: any) => {
      return deleteMeetingStaff(payload);
    },
    {
      onSuccess: (data, variables) => {
        refetch();
        refetchTask();
      },
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.message ||
            err?.message ||
            "Something went wrong!",
        );
      },
    },
  );
};

export const useDeleteClientMeeting = () => {
  const { refetch } = useQuery(QUERY_KEYS.GET_MEETING_CLIENT);
  const { refetch: refetchTask } = useQuery([
    QUERY_KEYS.GET_MEETINGS,
    localStorage.getItem("user_id"),
  ]);
  return useMutation(
    (payload: any) => {
      return deleteMeetingClient(payload);
    },
    {
      onSuccess: (data, variables) => {
        refetch();
        refetchTask();
      },
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.message ||
            err?.message ||
            "Something went wrong!",
        );
      },
    },
  );
};
