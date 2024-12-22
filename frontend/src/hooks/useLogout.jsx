import { toast } from "react-toastify";
import { useApiPrivate } from "./useApiPrivate";

export const useLogout = () => {
  const api = useApiPrivate();
  const logout = async () => {
    try {
      const response = await api.get("/auth/logout");
      localStorage.removeItem("token");
      return response;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout Failed");
    }
  };

  return logout;
};
