"use client";

import { useAuthStore } from "@/stores/auth-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserAvatar() {
  const { user } = useAuthStore();

  return (
    <Avatar className="h-8 w-8">
      <AvatarImage
        src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.fullName}`}
      />
      <AvatarFallback>{user?.fullName.charAt(0)}</AvatarFallback>
    </Avatar>
  );
}
