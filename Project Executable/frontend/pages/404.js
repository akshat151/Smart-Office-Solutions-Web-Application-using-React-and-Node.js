import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { ROUTES } from "../constants/routes";

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    toast.error("Invalid URL. Redirecting to login page.");
    router.push(ROUTES.login);
  }, [router]);

  return null;
}
