import React from "react";
import SingleMyappliedjob from "./_componets/single-myappliedjob";
import { Jobswhereihaveapplied } from "@/actions/get-jobs-where-i-applied";

const Page = async () => {
  const jobs = await Jobswhereihaveapplied();
  console.log("jobs"+jobs);
  return (
    <div className="mt-25">
      <div>You have applied in this job</div>
      <SingleMyappliedjob />
    </div>
  );
};

export default Page;
