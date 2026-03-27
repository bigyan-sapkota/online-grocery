import { useLocation } from "react-router-dom";
import type { User } from "@/types/user";
import UserDropdown from "@/components/dropdowns/user-dropdown";

type DashboardHeaderProps = {
  user: User;
};

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const { pathname } = useLocation();

  const pageTitle = pathname.split("/").slice(-1)[0] || "Dashboard";
  const formattedTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);

  return (
    <header className="flex h-16 w-full items-center justify-between border-b bg-white px-6">
      <h2 className="text-lg font-semibold">{formattedTitle}</h2>

      <UserDropdown user={user} />
    </header>
  );
}
