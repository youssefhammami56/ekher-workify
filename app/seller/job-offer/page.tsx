import { getalljoboffersdispo } from "@/actions/get-alljoboffersdispo";
import React from "react";
import SingleJobList from "./_compoenets/single-joblist-page";
import { categories } from "@/utils/categories";

const Page = async () => {
  const jobs = await getalljoboffersdispo();

  return (
    <div className="mt-25">
      {/* @ts-ignore */}
      <SingleJobList jobs={jobs} />
    </div>
  );
};

export default Page;
