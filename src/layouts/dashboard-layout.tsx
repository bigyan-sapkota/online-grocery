import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex">
      <aside></aside>
      <div>
        {/* todo : add header */}
        <Outlet />
      </div>
    </div>
  );
}
