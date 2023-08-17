import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { QUERY_KEYS } from "../constants/queryKeys";
import { getRoles, postRoles } from "../services/roles.services";

export const useGetRoles = () => {
  const { data, isLoading, isFetching, refetch } = useQuery(
    QUERY_KEYS.GET_ROLES,
    () => getRoles(),
  );
  return { data, isLoading: isLoading || isFetching, refetch };
};

export const usePostRoles = () => {
  const { refetch } = useQuery(QUERY_KEYS.GET_ROLES);
  return useMutation(
    (payload: any) => {
      return postRoles(payload);
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
