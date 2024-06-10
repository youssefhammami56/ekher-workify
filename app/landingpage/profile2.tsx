import React from "react";
import { getLoggedUser } from "@/actions/get-logged-user";

const Profile2 = async () => {
  const user = await getLoggedUser();
  // return <ProfileInformation user={user} />;
};

export default Profile2;
