import { getallfrelencer } from "@/actions/admin/getallfrelencer";
import React from "react";
import SingleFrelencer from "./_componets/singlefrelecnerpage";

const Page = async () => {
  const frelencers = await getallfrelencer();

  return (
    <div className="mx-8 mt-8">
      <div
        className="border-blue-200 bg-blue-100 flex flex-col rounded-lg border   p-1 mb-4 mx-8"
        role="alert"
      >
        <h3 className="text-lg font-semibold text-blue-800">
          Welcome to Workify Frelencers List
        </h3>

        <div>
          <div className="mt-2 text-sm text-muted-foreground">
            <span className="text-blue-800">
              You can view {frelencers.length} Frelencers
            </span>
          </div>
        </div>
      </div>
      <div className="mt-18">
        <SingleFrelencer frelencers={frelencers} />
      </div>
    </div>
  );
};

export default Page;
