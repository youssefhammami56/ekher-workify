"use client";

import { logout } from "@/actions/logout";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

function LogoutBtn() {
  const router = useRouter();
  const handelLogout = async () => {
    await logout();
    router.push("/sign-in");
  };
  return <DropdownMenuItem onClick={handelLogout}>Logout</DropdownMenuItem>;
}

export default LogoutBtn;
