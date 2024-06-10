import { getMypostuledJobs } from "@/actions/get-mypostuled-jobs";
import React from "react";
import PostuledJobs from "./_componets/PostuledJobs";

const Page = async () => {
  const mypostuledjobs = await getMypostuledJobs();
  return (
    <div className="mt-25">
      <PostuledJobs apply={mypostuledjobs} />
    </div>
  );
};

export default Page;
