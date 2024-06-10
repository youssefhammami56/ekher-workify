import { getMyjobOffers } from "@/actions/get-myjoboffers";
import React from "react";
import SingleMyjoboffers from "./_compoenets/single-myjoboffers";

const Page = async () => {
  const jobs = await getMyjobOffers();
 
  return (
    <div className="mt-25">
      <SingleMyjoboffers Jobs={jobs} />
    </div>
  );
};

export default Page;
