import { Outlet } from "react-router-dom";
import DashboardSidebar from "./dashboard-sidebar";
import { Toaster } from "sonner";

export default function DashboardLayout() {
  return (
    <div className="flex">
      <DashboardSidebar />
      <div>
        {/* todo : add header */}
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
}
