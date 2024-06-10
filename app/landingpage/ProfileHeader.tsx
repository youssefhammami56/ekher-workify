"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

interface ProfileHeaderProps {
  user: any;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  console.log("user2", user);
  return (
    <div className="flex items-center gap-x-2.5 w-20">
      <Avatar className="h-10 w-10 ">
        <AvatarImage
          className="rounded-full"
          src={user?.profileImage || ""}
          alt="User profile image"
        />
        <AvatarFallback className="uppercase">{user?.username}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col space-y-1">
        <div className="text-sm font-semibold">{user?.username}</div>
        <div className="text-xs text-gray-500">{user?.email}</div>
      </div>
    </div>
  );
}
