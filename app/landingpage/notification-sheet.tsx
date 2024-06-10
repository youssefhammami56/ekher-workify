"use client";

import { getAllNotifications } from "@/actions/getallnotifications";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { BellDot } from "lucide-react";
import { useEffect, useState } from "react";
import { any } from "zod";
import SingleNotifications from "./single-notification";
import { getLoggedUser } from "@/actions/get-logged-user";

interface SheetNotificationProps {
  user:Awaited<ReturnType<typeof getLoggedUser>>;
}

export default function SheetNotification({user}:SheetNotificationProps) {
  //make it de type getallnotifications
  const [notification, setNotification] = useState<any[]>([]);

  useEffect(() => {
    const fetchNotification = async () => {
      const notification = await getAllNotifications();
      //@ts-ignore
      setNotification(notification);
    };
    fetchNotification();
  }, []);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800">
          <div className="bg-muted rounded-full  border p-1">
            <BellDot className="w-[25px] h-[25px]  text-blue-500  bg-transparent" />
          </div>
        </button>
      </SheetTrigger>
      <SheetContent side={"right"} className="overflow-y-auto bg-white">
        <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
          Notifications
        </div>
        {notification.length === 0 && (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            No notifications
          </div>
        )}
        <ScrollArea className="h-[700px]  rounded-md border ">
          {/* @ts-ignore */}
          {notification.map((notification) => (
            <SingleNotifications
              key={notification.id}
              notifcation={notification}
              user={user}
            />
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
