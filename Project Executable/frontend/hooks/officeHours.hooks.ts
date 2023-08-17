import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { QUERY_KEYS } from "../constants/queryKeys";
import {
  deleteClient,
  getClients,
  patchClient,
  postClient,
} from "../services/clients.services";
import {
  deleteOfficeHours,
  getOfficeHours,
  postOfficeHours,
} from "../services/officeHours.services";

export const useGetOfficeHours = () => {
  const { data, isLoading, isFetching, refetch } = useQuery(
    QUERY_KEYS.GET_OFFICE_HOURS,
    () => getOfficeHours(localStorage.getItem("user_id") + ""),
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    },
  );
  return { data, isLoading: isLoading || isFetching, refetch };
};

export const usePostOfficeHours = () => {
  const { refetch } = useQuery(QUERY_KEYS.GET_OFFICE_HOURS);
  return useMutation(
    (payload: any) => {
      return postOfficeHours(payload);
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

export const useDeleteOfficeHours = () => {
  const { refetch } = useQuery(QUERY_KEYS.GET_OFFICE_HOURS);
  return useMutation(
    (officeHoursId: string) => {
      return deleteOfficeHours(officeHoursId);
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
