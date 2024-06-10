import React from "react";
import SingleJoboffer from "./_compoenets/singlejoboffer";
import { ithasapplyinjob } from "@/actions/ithasapplyinjob";
import { getJobOfferById, getRelatedjobthathavethesamecatergory } from "@/actions/getjobooferbuid";
import Link from "next/link";
import {
  BuildingIcon,
  CodeIcon,
  DatabaseIcon,
  LocateIcon,
  MountainSnowIcon,
  TypeIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Page = async ({
  params,
}: {
  params: {
    jobId: string;
  };
}) => {
  const ithasapplyedyet = await ithasapplyinjob(params.jobId);
  const job = await getJobOfferById(params.jobId);
  const relatedjobs=await getRelatedjobthathavethesamecatergory(params.jobId)
  return (
    <div className="">
      <SingleJoboffer
        jobId={params.jobId}
        ithasapplyedyet={ithasapplyedyet!}
        job={job}
        realtedJobs={relatedjobs}
      />
    </div>
  );
};

export default Page;
