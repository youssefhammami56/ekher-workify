"use client";
import { getallreports } from "@/actions/admin/getallreportforuser";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import Avatar component
import React, { useEffect, useState } from "react";

interface ReportBtnProps {
  user: any;
}

export function Reportlist({ user }: ReportBtnProps) {
  const [report, setReport] = useState("");
  const [reports, setReports] = useState<
    Awaited<ReturnType<typeof getallreports>>
  >([]);

  useEffect(() => {
    const fetchdata = async () => {
      const res = await getallreports(user.id);
      setReports(res);
    };
    fetchdata();
  }, [user.id]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{reports?.length} Reports</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>We display all reports for {user.email}</DialogTitle>
          <DialogDescription>
            There are {reports?.length} reports for this user
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 overflow-y-auto h-96">
          {/* @ts-ignore */}
          {reports.map((report) => (
            <div key={report.id} className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  alt={report.user.username!}
                  src={
                    report.user.profileImage ||
                    "/placeholder.svg?height=32&width=32"
                  }
                  loading="lazy"
                />
                <AvatarFallback>
                  {report.user.username![0].toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="text-sm font-medium">{report.user.username}</p>
                <p className="text-sm font-medium">{report.user.email}</p>

                <p className="text-sm text-gray-500">{report.reason}</p>
                <p className="text-sm text-gray-400">
                  Reported At {new Date(report.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>{/* Add any buttons if needed */}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
