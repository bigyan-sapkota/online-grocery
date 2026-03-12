import { apiClient } from "@/lib/api-client";
import { extractErrorMessage } from "@/lib/utils";
import type { User } from "@/types/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const profileKey = ["profile"];

export default function useProfile() {
  return useQuery({
    queryKey: profileKey,
    queryFn: getProfile,
  });
}

type ProfileResponse = {
  user: User;
};

async function getProfile(): Promise<User> {
  try {
    const response = await apiClient.get<ProfileResponse>(
      "/api/users/profile",
      { withCredentials: true },
    );
    return response.data.user;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}


export const invalidateProfile = () =>{
    const queryClient = useQueryClient();
    queryClient.invalidateQueries({
        queryKey: profileKey,
    });
}