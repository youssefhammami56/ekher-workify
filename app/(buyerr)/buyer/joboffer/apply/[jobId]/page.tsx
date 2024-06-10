import { gettheapplyinjobbijonid } from "@/actions/gettheapplyinjobbijonid";
import React from "react";
import SingleMyonlyjobapply from "../_componets/singlemyonlyjobapply";

const Page = async ({
  params,
}: {
  params: {
    jobId: string;
  };
}) => {
  const { jobId } = params;
  const jobs = await gettheapplyinjobbijonid(jobId);

  return (
    <div className="mt-25">
      <SingleMyonlyjobapply apply={jobs} />
    </div>
  );
};

export default Page;
