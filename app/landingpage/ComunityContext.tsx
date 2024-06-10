import { getAllComunity } from "@/actions/get-allcomunity";
import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { DialogDemo } from "./createcommunitybtn";

interface ComunityContextProps {
  data: Awaited<ReturnType<typeof getAllComunity>>;
}

function ComunityContext({ data }: any) {
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
        {/* @ts-ignore */}
        {data.map((comunity: any) => (
          <li
            key={comunity.id}
            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2"
            onClick={() => router.push(`/community/${comunity.id}`)}
          >
            {comunity.title}
          </li>
        ))}
      </ul>
      <hr />
      <DialogDemo />
    </div>
  );
}

export default ComunityContext;
