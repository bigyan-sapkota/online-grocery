import useProfile from "@/queries/use-profile";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

type PublicRouteProps = {
  children: React.ReactNode;
};

export default function PublicRoute({ children }: PublicRouteProps) {
  const { data: user, isLoading, isError, error } = useProfile();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error loading user because {error.message}</h1>;
  }

  if (user) {
    toast.dismiss();
    toast("You are already logged in!");
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
