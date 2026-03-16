import useProfile from "@/queries/use-profile";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: user, isLoading } = useProfile();

  if (isLoading) {
    return <div className="mt-10 text-center">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="mx-auto mt-10 w-full max-w-[800px] space-y-6 rounded-xl border p-6 text-center shadow-lg">
        <h1 className="text-3xl font-semibold">Login Required</h1>
        <p>
          Sorry you are not logged in and login is required to access this page
        </p>
        <Link to="/login" className="block">
          <Button>Go To Login Page</Button>
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
