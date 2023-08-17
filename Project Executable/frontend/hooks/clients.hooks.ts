import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { QUERY_KEYS } from "../constants/queryKeys";
import {
  deleteClient,
  getClients,
  patchClient,
  postClient,
} from "../services/clients.services";

export const useGetClients = () => {
  const { data, isLoading, isFetching, refetch } = useQuery(
    QUERY_KEYS.GET_CLIENTS,
    () => getClients(),
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    },
  );
  return { data, isLoading: isLoading || isFetching, refetch };
};

export const usePostClients = () => {
  const { refetch } = useQuery(QUERY_KEYS.GET_CLIENTS);
  return useMutation(
    (payload: any) => {
      return postClient(payload);
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

export const usePatchClient = () => {
  const { refetch } = useQuery(QUERY_KEYS.GET_CLIENTS);
  return useMutation(
    (payload: any) => {
      console.log(payload);
      return patchClient(payload);
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

export const useDeleteClient = () => {
  const { refetch } = useQuery(QUERY_KEYS.GET_CLIENTS);
  return useMutation(
    (clientId: string) => {
      return deleteClient(clientId);
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
