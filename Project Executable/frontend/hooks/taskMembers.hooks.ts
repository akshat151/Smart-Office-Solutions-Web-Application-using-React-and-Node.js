import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { QUERY_KEYS } from "../constants/queryKeys";
import {
  deleteTaskMember,
  getTaskMembers,
  postTaskMember,
} from "../services/taskMember.services";

export const useGetTaskMembers = (taskId: string) => {
  const { data, isLoading, isFetching, refetch } = useQuery(
    QUERY_KEYS.GET_TASK_MEMBER,
    () => getTaskMembers(taskId),
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    },
  );
  return { data, isLoading: isLoading || isFetching, refetch };
};

export const usePostTaskMember = () => {
  const { refetch } = useQuery(QUERY_KEYS.GET_TASK_MEMBER);
  const { refetch: refetchTask } = useQuery([
    QUERY_KEYS.GET_TASK,
    localStorage.getItem("user_id"),
  ]);

  return useMutation(
    (payload: any) => {
      return postTaskMember(payload);
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

export const useDeleteTaskMember = () => {
  const { refetch } = useQuery(QUERY_KEYS.GET_TASK_MEMBER);
  const { refetch: refetchTask } = useQuery([
    QUERY_KEYS.GET_TASK,
    localStorage.getItem("user_id"),
  ]);
  return useMutation(
    (payload: any) => {
      return deleteTaskMember(payload);
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
