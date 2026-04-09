import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User } from "@/types/user";
import { LayoutDashboard, LogOut, UserIcon } from "lucide-react";
import { Link } from "react-router-dom";
import LogoutDialog from "../dialogues/logout-dialog";
import { useState } from "react";

type UserDropdownProps = {
  user: User;
};

export default function UserDropdown({ user }: UserDropdownProps) {
  const [isLogoutOpen, setLogoutOpen] = useState(false);
  const name = user?.name;

  const profileFallback = name
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0].toUpperCase() || "")
    .join("");

  console.log(profileFallback);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-10 w-10 rounded-full p-0"
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.image ?? ""} />
              <AvatarFallback>{profileFallback}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col gap-1">
            <p className="font-medium">{user.name}</p>
            <p className="text-muted-foreground text-xs">{user.email}</p>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link to="/profile" className="flex items-center gap-2">
              <UserIcon size={16} />
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link to="/dashboard" className="flex items-center gap-2">
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="flex items-center gap-2 text-red-500 hover:text-red-700!"
            onSelect={() => setLogoutOpen(true)}
          >
            <LogOut size={16} className="text-red-500" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogoutDialog open={isLogoutOpen} onOpenChange={setLogoutOpen} />
    </div>
  );
}
