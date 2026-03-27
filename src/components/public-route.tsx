import useProfile from "@/queries/use-profile";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import ApiLoader from "./api-loader";

type PublicRouteProps = {
  children: React.ReactNode;
};

export default function PublicRoute({ children }: PublicRouteProps) {
  const { data: user, isLoading } = useProfile();

  if (isLoading) {
    return <ApiLoader />;
  }

  if (user) {
    toast.dismiss();
    toast("You are already logged in!");
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
