import { Outlet } from "react-router-dom";
import DashboardSidebar from "./dashboard-sidebar";
import { Toaster } from "sonner";
import DashboardHeader from "./dashboard-header";
import useProfile from "@/queries/use-profile";

export default function DashboardLayout() {
  const { data: user } = useProfile();

  if (!user) {
    return <p>abc</p>;
  }

  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="w-full">
        <DashboardHeader user={user} />
        <div className="h-full bg-gray-50 px-4 pt-4">
          <Outlet />
        </div>
      </div>
      <Toaster />
    </div>
  );
}
