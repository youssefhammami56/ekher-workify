"use client";
import { getalljoboffersdispo } from "@/actions/get-alljoboffersdispo";
import { format } from "date-fns";
import { ListIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface JobItemProps {
  job: {
    id: number;
    title: string;
    category: string;
    description: string;
    createdAt: string;
    createdBy: {
      profileImage?: string;
      email?: string;
      username?: string;
    };
  };
}

function JobItem({ job }: JobItemProps) {
  const router = useRouter();

  return (
    <div
      className="bg-white shadow-lg rounded-lg p-6 cursor-pointer"
      onClick={() => router.push(`/seller/job-offer/${job.id}`)}
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
      <p className="text-gray-600 mb-4">{job.description}</p>
      <div className="flex items-center text-gray-600">
        <span className="mr-2">Category: {job.category}</span>
        <span>Joined at {format(new Date(job.createdAt), "dd MMM yyyy")}</span>
      </div>
    </div>
  );
}

export default JobItem;