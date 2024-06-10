import { getuserById } from "@/actions/getuserbyid";
import React from "react";
import SingleUpdateProfile from "../../(profile)/_compoenets/singleupdateprofile";

const Page = async ({
  params,
}: {
  params: {
    buyerId: string;
  };
}) => {
  const user = await getuserById(params.buyerId);

  return (
    <div>
      <SingleUpdateProfile user={user} />
    </div>
  );
};

export default Page;
