import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { loginUser } from "../services/auth.services";

export const useLoginUser = () => {
  return useMutation(
    ({ payload, callback }: { payload: any; callback: any }) => {
      return loginUser(payload);
    },
    {
      onSuccess: (data, variables) => {
        toast.success("Logged in successfully. Redirecting...");
        localStorage.setItem("user_id", data.id);
        localStorage.setItem("access_token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("email", data.email);
        variables.callback();
      },
      onError: (err: any) => {
        console.log(err.message);
        toast.error("Failed to login.");
      },
    },
  );
};
