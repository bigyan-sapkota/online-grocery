import { apiClient } from "@/lib/api-client";
import { extractErrorMessage } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const logoutKey = ["logout"];

type LogoutResponse = {
  message: string;
};

export default function useLogout() {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: logoutKey,
    mutationFn: logoutUser,

    onMutate: () => {
      toast.loading("Logging out");
    },

    onError: (error: Error) => {
      toast.dismiss();
      toast.error(error.message || "Error while logging out.");
    },

    onSuccess: () => {
      toast.dismiss();
      toast.success("User logged out successfully!");

      navigate("/");
    },
  });
}

const logoutUser = async (): Promise<string> => {
  try {
    const response = await apiClient.post<LogoutResponse>(
      "/api/auth/logout",
      null,
      {
        withCredentials: true,
      },
    );
    return response.data.message;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
