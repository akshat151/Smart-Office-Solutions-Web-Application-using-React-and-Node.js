import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { QUERY_KEYS } from "../constants/queryKeys";
import {
  deleteTask,
  getTasks,
  patchTask,
  postTask,
} from "../services/task.services";

export const useGetTasks = () => {
  const { data, isLoading, isFetching, refetch } = useQuery(
    [QUERY_KEYS.GET_TASK, localStorage.getItem("user_id")],
    () => getTasks(),
    {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchInterval: 1000,
    },
  );
  const modData = (data || []).map((p: any) => ({
    ...p,
    startDate: p.startDate
      ? new Date(p.startDate).toISOString().slice(0, 10)
      : null,
  }));
  return { data: modData, isLoading: isLoading || isFetching, refetch };
};

export const usePostTask = () => {
  const { refetch } = useQuery([
    QUERY_KEYS.GET_TASK,
    localStorage.getItem("user_id"),
  ]);
  return useMutation(
    (payload: any) => {
      return postTask(payload);
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

export const usePatchTask = () => {
  const { refetch } = useQuery([
    QUERY_KEYS.GET_TASK,
    localStorage.getItem("user_id"),
  ]);
  return useMutation(
    (payload: any) => {
      console.log(payload);
      return patchTask(payload.taskId, payload);
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

export const useDeleteTask = () => {
  const { refetch } = useQuery([
    QUERY_KEYS.GET_TASK,
    localStorage.getItem("user_id"),
  ]);
  return useMutation(
    (taskId: string) => {
      return deleteTask(taskId);
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
