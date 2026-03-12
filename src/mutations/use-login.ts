import type { LoginSchema } from "@/forms/login-form/schema";
import { apiClient } from "@/lib/api-client";
import { extractErrorMessage } from "@/lib/utils";
import type { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
 
type LoginResponse = {
  user: User;
};
 
export default function useLogin() {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,
  });
}
 
async function loginUser(data: LoginSchema): Promise<User> {
  try {
    const response = await apiClient.post<LoginResponse>(
      "/api/auth/login",
      data,
      {withCredentials: true}
    );
    return response.data.user;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}
 