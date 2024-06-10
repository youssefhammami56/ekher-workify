"use client";

import { getAllCommunity } from "@/actions/get-all-community";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Code2, UsersIcon, Verified } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface ComunityUserItemProps {
  comm: Awaited<ReturnType<typeof getAllCommunity>>[0];
}

export default function ComunityListItem({ comm }: ComunityUserItemProps) {
  const router = useRouter();
  const handelOnclick = (id: string) => {
    router.push(`/buyer/community/${id}`);
  };

  return (
    <div
      className="
    mb-4 w-full hover:bg-slate-300/20 dark:hover:bg-gray-700  border-b border-gray-300 dark:border-gray-700  transition-colors duration-200 ease-in-out p-2
    cursor-pointer
    "
    >
      <div
        className="flex items-center justify-between space-x-2 cursor-pointer"
        onClick={() => handelOnclick(comm.id)}
      >
        <div className="flex gap-x-3 ">
          <UsersIcon size={24} className="text-sky-500" />
          <div className="text-sm font-semibold">{comm.title}</div>
        </div>
        <div>
          <span className="text-xs text-gray-400 ">
            {" "}
            {comm.posts.length} {comm.posts.length > 1 ? "Posts" : "Post"}
          </span>
        </div>
      </div>
    </div>
  );
}
