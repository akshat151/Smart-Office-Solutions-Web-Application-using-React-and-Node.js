import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { QUERY_KEYS } from "../constants/queryKeys";
import {
  getTaskTypes,
  patchTaskTypes,
  postTaskTypes,
} from "../services/taskTypes.services";

export const useGetTaskTypes = () => {
  const { data, isLoading, isFetching, refetch } = useQuery(
    QUERY_KEYS.GET_TASK_TYPES,
    () => getTaskTypes(),
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    },
  );
  return { data, isLoading: isLoading || isFetching, refetch };
};

export const usePostTaskTypes = () => {
  const { refetch } = useQuery(QUERY_KEYS.GET_TASK_TYPES);
  return useMutation(
    (payload: any) => {
      return postTaskTypes(payload);
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

export const usePatchTaskTypes = () => {
  const { refetch } = useQuery(QUERY_KEYS.GET_TASK_TYPES);
  return useMutation(
    (payload: any) => {
      return patchTaskTypes(payload);
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
