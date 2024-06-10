import React from "react";
import Details from "./_compoenets/Details";
import Pricing from "./_compoenets/Pricing";
import { getGigsById } from "@/actions/get-gigs-byid";
import { getLoggedUser } from "@/actions/get-logged-user";


const Page = async ({
  params,
}: {
  params: {
    gigId: string;
  };
}) => {
  console.log(params.gigId);
  const gig = await getGigsById(params.gigId);
  const userInfo = await getLoggedUser();
  
  return (
    <div className="flex justify-center items-start min-h-screen py-12 bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100 w-full max-w-5xl">
        <h1 className="text-4xl font-bold text-center text-blue-400 mb-8">
          Explore Service
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2">
            <Details gigData={gig} />
          </div>
          <div>
            <Pricing gigData={gig} userInfo={userInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
