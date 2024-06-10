"use client";

import React from "react";
import { formatDistance } from "date-fns";
import { Check } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { getAllNotifications } from "@/actions/getallnotifications";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { markNotificationAsRead } from "@/actions/markNotificationAsread";
import { useSession } from "next-auth/react";
import { getLoggedUser } from "@/actions/get-logged-user";

interface SingleNotificationsProps {
  notifcation: Awaited<ReturnType<typeof getAllNotifications>>[0];
  user: Awaited<ReturnType<typeof getLoggedUser>>;
}

export default function SingleNotifications({
  notifcation,
  user,
}: SingleNotificationsProps) {
  const pathnames = usePathname();
  const [wichCheck, setWichCheck] = React.useState(false);
  const isfrelecner = pathnames.includes("seller");
  const isclient = pathnames.includes("buyer");
  const router = useRouter();

  console.log("user2", user);

  const handelmakeread = async (id: string) => {
    setWichCheck(true);
    await markNotificationAsRead(id);
  };

  const handelOnclick = (message: string) => {
    message.split(" ")[4] === "message" &&
      isfrelecner &&
      router.push(`/seller/orders/messages/${notifcation?.distinationId}`);
    message.split(" ")[4] === "message" &&
      isclient &&
      router.push(`/buyer/orders/messages/${notifcation?.distinationId}`);
    message.split(" ")[1] === "application" &&
      isfrelecner &&
      router.push(`/seller/postuled-jobs`);
    message.split(" ")[4] === "order" &&
      isfrelecner &&
      router.push(`/seller/orders`);
    message.split(" ")[4] === "application" &&
      isclient &&
      router.push(`/buyer/joboffer/apply/${notifcation?.distinationId}`);
    message.split(" ")[1] === "order" &&
      isclient &&
      router.push(`/buyer/orders`);
  };

  return (
    <div>
      <div
        onClick={() => {
          handelOnclick(notifcation?.message);
        }}
        className="cursor-pointer"
      >
        <div className="flex py-3  hover:bg-gray-100 dark:hover:bg-gray-700  border-b border-gray-300 dark:border-gray-700  transition-colors duration-200 ease-in-out">
          <div className="flex-shrink-0 mt-3">
            <Avatar className="h-10 w-10 ">
              <AvatarImage
                className="rounded-full"
                src={notifcation?.user?.profileImage || ""} // i want to do the creation time - current time
                alt={notifcation?.user?.profileImage || ""}
              />
              <AvatarFallback className="uppercase">
                {notifcation?.user?.username![0]}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="w-full ps-3">
            <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">
                {notifcation?.message}
              </span>
            </div>
            <div className="flex justify-between items-center ">
              <div className="text-xs text-blue-600 dark:text-blue-500 ">
                {/* i want to do the creation time - current time */}
                {formatDistance(new Date(notifcation?.createdAt!), new Date(), {
                  addSuffix: true,
                })}
              </div>
              <div>
                {notifcation?.isRead && (
                  <div className="flex gap-x-2">
                    <Check className="w-5 h-5 text-green-600 mr-6" />
                  </div>
                )}
                {!notifcation?.isRead ? (
                  <>
                    <p
                      onClick={() => {
                        handelmakeread(notifcation?.id);
                      }}
                      className="text-xs text-gray-500 dark:text-gray-400 mr-2 cursor-pointer"
                    >
                      <div>
                        {wichCheck ? (
                          <Check className="w-5 h-5 text-green-600 mr-6" />
                        ) : (
                          "Mark as read"
                        )}
                      </div>
                    </p>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
