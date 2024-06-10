import { getjobofferbyid } from "@/actions/getjobofferbyid";
import React from "react";
import SingleJobofferEdit from "./_compoenents/singleeditpage";

const Page = async ({ params }: { params: { jobId: string } }) => {

    const job=await getjobofferbyid(params.jobId);
  return <div className="mt-25">
    <SingleJobofferEdit job={job} />
  </div>;
};

export default Page;
