import { getSellerData } from "@/actions/getsellerdata";
import React from "react";
import { getLoggedUser } from "@/actions/get-logged-user";
import { redirect } from "next/navigation";

const Page = async () => {
  const data = await getSellerData();
  const user = await getLoggedUser();

  console.log("data", data);
  redirect("/seller/dashboard");

  return (
    <div className="mt-25">
    </div>
  );
};

export default Page;
