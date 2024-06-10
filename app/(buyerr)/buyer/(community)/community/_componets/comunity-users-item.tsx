"use client";

import { getAllusersInComunityById } from "@/actions/get-users-in-community";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Verified } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface ComunityUserItemProps {
  user: Awaited<ReturnType<typeof getAllusersInComunityById>>[0];
}

export default function ComunityUserItem({ user }: ComunityUserItemProps) {
  return (
    <div
      className="
    mb-4 w-full hover:bg-slate-300/20 dark:hover:bg-gray-700  border-b border-gray-300 dark:border-gray-700  transition-colors duration-200 ease-in-out p-2
    cursor-pointer
    "
    >
      <div className="flex items-center justify-between space-x-2">
        <div className="flex gap-x-2 items-center">
          <Avatar>
            <AvatarImage
              alt="Abdoulaye"
              src={
                user.user.profileImage || "/placeholder.svg?height=32&width=32"
              }
            />
            <AvatarFallback>
              {user.user.username![0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-sm font-semibold">
            {user.user.username?.split(" ")[0]}
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400 flex gap-x-1"></div>
        </div>
        <div>
          <span className="text-xs text-gray-400">{user.postsCount} Posts</span>
        </div>
      </div>
    </div>
  );
}
