import { cn } from "@/lib/utils";
import { LayoutDashboard, Package, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const items = [
  { id: 1, title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  {
    id: 2,
    title: "Manage Products",
    icon: Package,
    href: "/dashboard/products",
  },
  {
    id: 3,
    title: "Manage Orders",
    icon: ShoppingCart,
    href: "/dashboard/orders",
  },
];

export default function DashboardSidebar() {
  const { pathname } = useLocation();
  const arr = pathname.split("/");
  console.log(arr.slice(1));
  return (
    <aside>
      <div className="h-16 flex items-center border-b px-6">
        <Link to="/">
          <h1 className="text-primary text-xl font-bold md:text-2xl">
            Online Grocery
          </h1>
        </Link>
      </div>

      <nav className="p-4 pr-0 space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.id}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition",
                active && "bg-gray-300",
              )}
            >
              <Icon size={18} />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
