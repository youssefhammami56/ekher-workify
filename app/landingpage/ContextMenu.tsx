import { logout } from "@/actions/logout";
import { useRouter } from "next/navigation";
import React from "react";
import SheetNotification from "./notification-sheet";

function ContextMenu({ data }: any) {
  const router = useRouter();

  const handelLogout = async () => {
    await logout();
    router.push("/");
  };
  return (
    <div
      className={`z-10  bg-white divide-y divide-gray-100  shadow-2xl border w-44 dark:bg-gray-700
      fixed right-5 top-20 
      `}
    >
      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
        <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
          <button
            onClick={() => {
              router.push("/profile");
            }}
          >
            Profile
          </button>
        </li>
        <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
          <button onClick={handelLogout}>Logout</button>
        </li>
      </ul>
    
    </div>
  );
}

export default ContextMenu;
