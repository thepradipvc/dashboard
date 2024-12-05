import { getQueryClient } from "@/components/react-query-provider";
import { toast } from "sonner";
import { navigate } from "./router-utils";

const logout = () => {
  localStorage.removeItem("auth_token");
  toast.success("Logged out successfully")
  const queryClient = getQueryClient();
  queryClient.clear();
  navigate("/auth/login");
};

export default logout;