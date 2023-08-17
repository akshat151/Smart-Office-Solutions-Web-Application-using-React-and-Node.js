import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { QUERY_KEYS } from "../constants/queryKeys";
import {
  deleteStaff,
  getStaff,
  patchStaff,
  postStaff,
} from "../services/staff.services";

export const useGetStaff = () => {
  const { data, isLoading, isFetching, refetch } = useQuery(
    QUERY_KEYS.GET_STAFF,
    () => getStaff(),
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    },
  );
  const modData = (data || []).map((p: any) => ({
    ...p,
    dob: p.dob ? new Date(p.dob).toISOString().slice(0, 10) : null,
  }));
  return { data: modData, isLoading: isLoading || isFetching, refetch };
};

export const usePostStaff = () => {
  const { refetch } = useQuery(QUERY_KEYS.GET_STAFF);
  return useMutation(
    (payload: any) => {
      return postStaff(payload);
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

export const usePatchStaff = () => {
  const { refetch } = useQuery(QUERY_KEYS.GET_STAFF);
  return useMutation(
    (payload: any) => {
      console.log(payload);
      return patchStaff(payload);
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

export const useDeleteStaff = () => {
  const { refetch } = useQuery(QUERY_KEYS.GET_STAFF);
  return useMutation(
    (staffId: string) => {
      return deleteStaff(staffId);
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
