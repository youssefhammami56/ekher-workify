"use client";
import { applyinjoboffer } from "@/actions/applay-in-job-offer";
import {
  getJobOfferById,
  getRelatedjobthathavethesamecatergory,
} from "@/actions/getjobooferbuid";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  CheckCircleIcon,
  ClockIcon,
  GlobeIcon,
  StarHalfIcon,
  StarIcon,
  Timer,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ithasapplyinjob } from "@/actions/ithasapplyinjob";
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

interface JobOffer {
  jobId: string;
  ithasapplyedyet: boolean;
  job: Awaited<ReturnType<typeof getJobOfferById>>;
  realtedJobs: Awaited<
    ReturnType<typeof getRelatedjobthathavethesamecatergory>
  >;
}

function SingleJoboffer({
  jobId,
  ithasapplyedyet,
  job,
  realtedJobs,
}: JobOffer) {
  const router = useRouter();

  const handleApply = async () => {
    await applyinjoboffer(jobId);
    router.refresh();
    toast.success("You have applied to this job");
    router.push("/seller/postuled-jobs");
  };

  return (
    // <div className="max-w-4xl mx-auto my-10 p-8 bg-white shadow-lg rounded-lg">
    //   <div className="flex flex-col md:flex-row justify-between items-start mb-6">
    //     <div className="flex-1">
    //       <h1 className="text-3xl font-bold mb-4 text-gray-800">
    //         {job?.title!}
    //       </h1>
    //       <div className="flex items-center text-sm text-gray-500 mb-6">
    //         <ClockIcon className="h-5 w-5 mr-2" />
    //         {format(new Date(job?.createdAt!), "dd MMM yyyy")}
    //         <GlobeIcon className="h-5 w-5 mx-4" />
    //         Worldwide
    //       </div>
    //       <div className="text-gray-700 mb-6">
    //         <p className="mb-4">{job?.description!}</p>
    //         <Image
    //           src={job?.imagesrc || "/default-profile.jpg"}
    //           alt="Picture of job"
    //           width={500}
    //           height={300}
    //           className="rounded-lg shadow-md object-cover"
    //         />
    //       </div>
    //       <div className="flex items-center justify-between mb-6">
    //         <div className="text-lg font-semibold text-blue-600">
    //           ${job?.price!}
    //         </div>
    //       </div>
    //       <div className="flex flex-wrap gap-2 mb-6">
    //         {job?.expertise?.map((expertise) => (
    //           <Badge key={expertise} variant="secondary">
    //             {expertise}
    //           </Badge>
    //         ))}
    //       </div>
    //       {!ithasapplyedyet ? (
    //         <Button
    //           className="mb-2 bg-blue-500 text-white hover:bg-blue-600"
    //           onClick={handleApply}
    //         >
    //           Apply Now
    //         </Button>
    //       ) : (
    //         <Badge className="mb-4">You have already applied to this job</Badge>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <div className="flex flex-col max-h-full">
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 px-4 md:px-6 py-12 md:py-24  border border-gray-300 dark:border-gray-800">
        <div className=" border border-gray-300 dark:border-gray-800 p-8">
          <section className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold">{job?.title}</h1>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <BuildingIcon className="h-5 w-5" />
                <span>
                  {job?.category}
                </span>
                <LocateIcon className="h-5 w-5" />
                <span>Remote</span>
                <Timer className="h-5 w-5" />
                <span>
                  {/*@ts-ignore*/}
                  {format(new Date(job?.createdAt), "dd MMM yyyy")}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Job Description</h2>
              <p className="text-gray-500 dark:text-gray-400">
                {job?.description}
              </p>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Requirements</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-500 dark:text-gray-400">
                 {/* @ts-ignore */}
                {job?.expertise?.map((expertise) => (
                  <li key={expertise}>{expertise}</li>
                ))}
                {/* <li>5+ years of experience in frontend development</li>
                  <li>Proficient in React, Vue, or Angular</li>
                  <li>Strong understanding of HTML, CSS, and JavaScript</li>
                  <li>
                    Experience with responsive design and cross-browser
                    compatibility
                  </li>
                  <li>Familiarity with version control systems like Git</li>
                  <li>Excellent problem-solving and communication skills</li> */}
              </ul>
            </div>
            {!ithasapplyedyet ? (
              <Button
                className="w-full sm:w-auto bg-[#0077b6] text-gray-50 hover:bg-[#005d8f] dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200"
                onClick={handleApply}
              >
                Apply for this job
              </Button>
            ) : (
              <Badge className="mb-4">
                You have already applied to this job
              </Badge>
            )}
          </section>
        </div>
        <div className="space-y-6">
          <Card className="bg-[#0077b6] text-gray-50 dark:bg-gray-950 dark:text-gray-50">
            <CardHeader>
              <CardTitle>Related Jobs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
               {/* @ts-ignore */}
              {realtedJobs?.map((job) => (
                <Link
                  key={job.id}
                  className="grid grid-cols-[48px_1fr] items-center gap-4 hover:bg-[#005d8f] dark:hover:bg-gray-800 rounded-md p-2"
                  href={`/seller/job-offer/${job.id}`}
                >
                  <div className="bg-[#005d8f] dark:bg-gray-800 rounded-md p-2">
                    <BuildingIcon className="h-6 w-6 text-gray-400 dark:text-gray-400" />
                  </div>
                  <div>
                    <div className="font-semibold">{job.title}</div>
                    <div className="text-sm text-gray-400 dark:text-gray-400">
                      {job.category}
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default SingleJoboffer;
