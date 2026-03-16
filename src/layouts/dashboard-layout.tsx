import { Outlet } from "react-router-dom";
import DashboardSidebar from "./dashboard-sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex">
      <DashboardSidebar />
      <div>
        {/* todo : add header */}
        <Outlet />
      </div>
    </div>
  );
}
