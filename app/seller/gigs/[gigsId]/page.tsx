import { getGigsById } from "@/actions/get-gigs-byid";
import React from "react";
import SingleGigsId from "./_components/singlegigsId";

const Page = async ({
  params,
}: {
  params: {
    gigsId: string;
  };
}) => {
  const gigsId = params.gigsId;
  const gigs = await getGigsById(gigsId);

  return (
    <div>
      <SingleGigsId gigs={gigs} />
    </div>
  );
};

export default Page;
