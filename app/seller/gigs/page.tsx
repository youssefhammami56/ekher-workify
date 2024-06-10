import { getMygigs } from "@/actions/get-my-gigs";
import React from "react";
import SingleMyGigsPage from "./_components/singlemygigspage";

const Page = async () => {
  const gigs = await getMygigs();
  return (
    <div className="mt-28">
      <SingleMyGigsPage gigs={gigs} />
    </div>
  );
};

export default Page;
