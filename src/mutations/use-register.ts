import { apiClient } from "@/lib/api-client";
import { extractErrorMessage, imageBbUrlGenerator } from "@/lib/utils";
import type { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useLogin, { loginUser } from "./use-login";

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  image?: File;
};

type RegisterResponse = {
  user: User;
};

export default function useRegister() {
  const navigate = useNavigate();
  const { mutate } = useLogin();
  return useMutation({
    mutationKey: ["register"],
    mutationFn: registerUser,

    onMutate: () => {
      toast.loading("Registering user...");
    },

    onError: () => {
      toast.dismiss();
      toast.error("Error registering user");
    },

    onSuccess: async (_, variables) => {
      const { email, password } = variables;
      toast.dismiss();
      toast.success("User registered successfully");
      navigate("/");

      mutate({ email, password });
    },
  });
}

async function registerUser(data: RegisterPayload): Promise<User> {
  try {
    let imageUrl: string | null = null;

    if (data.image) {
      imageUrl = await imageBbUrlGenerator(data.image);
    }

    const { name, email, password, phone } = data;

    const payload = {
      name,
      email,
      password,
      phone: Number(phone) || null,
      image: imageUrl,
    };

    const response = await apiClient.post<RegisterResponse>(
      "/api/auth/register",
      payload,
      { withCredentials: true },
    );
    return response.data.user;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}
