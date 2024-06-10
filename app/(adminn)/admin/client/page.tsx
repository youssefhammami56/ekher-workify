import { getallclient, getallfrelencer } from "@/actions/admin/getallfrelencer";
import React from "react";
import SingleClientPage from "./_compoenets/singleclientpage";

const Page = async () => {
  const frelencers = await getallclient();

  return (
    <div className="mx-8 mt-8">
      <div
        className="border-blue-200 bg-blue-100 flex flex-col rounded-lg border   p-1 mb-4 mx-8"
        role="alert"
      >
        <h3 className="text-lg font-semibold text-blue-800">
          Welcome to Workify Client
        </h3>

        <div>
          <div className="mt-2 text-sm text-muted-foreground">
            <span className="text-blue-800">
              You can view {frelencers.length} Client
            </span>
          </div>
        </div>
      </div>
    <div className="mt-18">
      <SingleClientPage frelencers={frelencers} />
    </div>
  </div>
  );
};

export default Page;
