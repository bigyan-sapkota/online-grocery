"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useLogout from "@/mutations/use-logout";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function LogoutDialog({ open, onOpenChange }: Props) {
  const { mutate, isPending, isSuccess } = useLogout();

  const handleLogout = () => {
    if (isPending) return;
    mutate();

    if (isSuccess) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            You will need to log in again to access your account.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button
            variant="destructive"
            disabled={isPending}
            onClick={handleLogout}
          >
            {isPending ? "Logging out…" : "Logout"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
