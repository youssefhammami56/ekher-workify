// "use client";
// import { Toaster, toast } from "react-hot-toast";

// import { useSession } from "next-auth/react";
// import React, { use, useEffect, useState } from "react";
// import { Calendar } from "@/components/ui/calendar";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
// // import { FileUpload } from "../file-upload";
// import Image from "next/image";
// import { BeatLoader } from "react-spinners";
// import Select from "react-select";
// import filiers from "@/data/filiers";
// // import { FillInformation } from "@/actions/profile/fill-information";
// import { Button } from "@/components/ui/button";
// import { MdClose } from "react-icons/md";
// import { Origin } from "@prisma/client";
// import { Plus, Settings, User, X } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import ProfileHeader from "./ProfileHeader";

// import Contact from "./contact";
// import { CountrySelect, CountrySelectValue } from "./country-select";
// import {
//   AlertDialog,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogOverlay,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import UploadImagewithcloudinarincomunity from "../seller/(community)/community/_componets/comunity-upload-image copy";
// import { getLoggedUser } from "@/actions/get-logged-user";
// import { FillInformation } from "@/actions/fill-information";
// import UploadPhotoProfile from "./UploadPhotoProfile";

// interface ProfileInformationForm {
//   location: string;
//   personalInformation: string;
//   profilePicture: string;
// }

// interface userDataProps {
// }
// interface data {
//   date: Date;
//   optionSelected: string;
//   imageUrl: string;
//   country: CountrySelectValue | undefined;
//   about: string;
// }

// interface ProfileHeaderProps {
//   user: any;
// }
// export const ProfileInformation = ({ user }: ProfileHeaderProps) => {
//   //
//   console.log("user" + user);
//   const initialDate = user?.DateOfBirth
//     ? new Date(user?.DateOfBirth)
//     : new Date();
//   const initailFilier = user?.filier ? user?.filier : "";
//   const initailImageUrl = user?.profileImage ? user?.profileImage : "";
//   const initialeAbout = user?.about ? user?.about : "";
//   const initialFilier = user?.filier || "";

//   const initialeOrigin = user?.origin || {
//     id: "",
//     userId: "",
//     value: "",
//     label: "",
//     flag: "",
//     region: "",
//     lalng: [0, 0],
//   };

//   const [initailFilierValue, setInitailFilierValue] =
//     useState<string>(initailFilier);
//   const initialSubtitle = user?.subtitle ? user?.subtitle : "";
//   const initialPatients = user?.patiants ? user?.patiants : [];
//   const initialLinkin = user?.linkedin ? user?.linkedin : "";
//   const initialgithub = user?.github ? user?.github : "";
//   const initialtwitter = user?.twitter ? user?.twitter : "";

//   const [currentStep, setCurrentStep] = useState(1);
//   const [date, setDate] = useState<Date>(initialDate);
//   const [optionSelected, setOptionSelected] = useState<string>(initailFilier);
//   const [about, setAbout] = useState<string>(initialeAbout);
//   const [imageUrl, setImageUrl] = useState<string>(initailImageUrl);
//   const [isloading, setIsloading] = useState(false);
//   const [isFinished, setIsFinished] = useState(false);
//   const [origin, setOrigin] = useState<Origin>(initialeOrigin);
//   const [patient, setPatient] = useState<string>("");
//   const [patiants, setPatiants] = useState<string[]>(initialPatients);
//   const [subtitle, setSubtitle] = useState<string>(initialSubtitle);
//   const [linkedin, setLinkedin] = useState<string>(initialLinkin);
//   const [github, setGithub] = useState<string>(initialgithub);
//   const [twitter, setTwitter] = useState<string>(initialtwitter);

//   const steps = [
//     {
//       title: "Your location",
//     },
//     {
//       title: "Personal Information",
//     },
//     {
//       title: "Finish",
//     },
//     {
//       title: "Profile Picture",
//     },
//   ];
//   const filierOptions = filiers;

//   const [location, setLocation] = useState<CountrySelectValue>();

//   const onpatientPuch = async (data: any) => {
//     await setPatiants((prev) => {
//       const updatedOptions = [...prev, data];

//       setPatient("");

//       return updatedOptions;
//     });
//   };

//   const handleNext = () => {
//     setCurrentStep((prevStep) => {
//       if (prevStep === 2) {
//         if (date && optionSelected && about) {
//           return prevStep + 1;
//         } else {
//           toast.error("Please fill all the fields");
//           return prevStep;
//         }
//       }

//       if (prevStep === 1) {
//         if (origin) {
//           return prevStep + 1;
//         } else {
//           toast.error("Please select your location");
//           return prevStep;
//         }
//       }

//       return prevStep + 1;
//     });
//   };

//   const handelPrevious = () => {
//     setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
//   };

//   const handelSubmit = async () => {
//     const data = {
//       date: date as Date,
//       optionSelected: optionSelected as string,
//       imageUrl: imageUrl as string,
//       country: origin as CountrySelectValue,
//       about: about as string,
//       subtitle: subtitle as string,
//       patients: patiants as string[],
//       linkedin: linkedin as string,
//       github: github as string,
//       twitter: twitter as string,
//     };
//     await FillInformation(data)
//       .then((res: any) => {
//         if (res.success) {
//           toast.success("Profile Information Added Successfully");
//         } else {
//           toast.error(res.error);
//         }
//       })
//       .then(() => {
//         setIsFinished(true);
//       });
//   };

//   return (
//     <>
//       <Toaster />
//       <AlertDialog>
//         <AlertDialogTrigger className="flex items-center gap-x-2" asChild>
//           <Button className="w-full " variant={"outline"}>
//             Profile information
//           </Button>
//         </AlertDialogTrigger>
//         <AlertDialogContent className="max-w-[50%] overflow-hidden bg-white">
//           <AlertDialogTitle className="flex justify-between items-center w-full">
//             <ProfileHeader user={user} />

//             <div className="flex gap-x-1">
//               <div className="flex gap-x-3 cursor-pointer">
//                 {currentStep !== 6 ? (
//                   <Badge
//                     variant="outline"
//                     className="p-1"
//                     onClick={() => setCurrentStep(6)}
//                   >
//                     <div className="flex items-center gap-x-1 p-1">
//                       {" "}
//                       <Settings size={18} />
//                       <span>Setting</span>
//                     </div>
//                   </Badge>
//                 ) : (
//                   <Badge
//                     variant="outline"
//                     className="p-1"
//                     onClick={() => setCurrentStep(1)}
//                   >
//                     <div className="flex items-center gap-x-1 p-1">
//                       {" "}
//                       <User size={18} />
//                       <span>You Profile</span>
//                     </div>
//                   </Badge>
//                 )}
//               </div>
//               <AlertDialogTrigger asChild>
//                 <button>
//                   <MdClose size={24} />
//                 </button>
//               </AlertDialogTrigger>
//             </div>
//           </AlertDialogTitle>
//           <AlertDialogDescription></AlertDialogDescription>
//           {currentStep === 6 ? (
//             <div>
//               {/* <Setting
//                 user={user?.data?.user!}
//               /> */}
//             </div>
//           ) : (
//             <div>
//               {/* <Stepper
//                 steps={steps}
//                 currentStep={currentStep}
//                 isFinished={isFinished}
//               /> */}
//             </div>
//           )}

//           {currentStep === 1 && (
//             <div>
//               <CountrySelect
//                 value={origin}
//                 /* @ts-ignore */
//                 onChange={(value) => setOrigin(value)}
//               />
//               <div className="flex items-center justify-center">
//                 <button
//                   onClick={handleNext}
//                   className="mt-4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 w-full rounded-md py-2"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}

//           {currentStep === 2 && (
//             <div>
//               <div className="flex flex-row items-start">
//                 <div className="flex-1 pr-4">
//                   <div className="mt-3 mb-3">Your Birdhday</div>
//                   <Calendar
//                     mode="single"
//                     selected={date as Date}
//                     onSelect={setDate as any}
//                     className="rounded-md border w-full"
//                   />
//                 </div>

//                 <div className="flex-1 ">
//                   <div className="mt-3 mb-3">Select Your filier</div>

//                   <Select
//                     options={filierOptions}
//                     placeholder="Select your filier"
//                     className="w-full rounded-md border py-2 px-4 mb-3"
//                     value={
//                       filierOptions.find(
//                         (option) => option.value === initailFilierValue
//                       ) || null
//                     }
//                     onChange={(value: any) => {
//                       setInitailFilierValue(value?.value as string);
//                       setOptionSelected(value?.value as string);
//                     }}
//                     formatOptionLabel={(option: any) => {
//                       return (
//                         <div>
//                           <div>{option.option}</div>
//                         </div>
//                       );
//                     }}
//                   />
//                   <div className="mb-3">What about you</div>

//                   <Textarea
//                     placeholder="Tell us about yourself"
//                     className="w-full rounded-md border py-2 px-4 mb-3 h-48"
//                     value={about}
//                     onChange={(e) => setAbout(e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div className="flex flex-row justify-between gap-3 items-center">
//                 <div className="flex-1">
//                   <button
//                     onClick={handelPrevious}
//                     className="mt-4 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 w-full rounded-md py-2"
//                   >
//                     Previews
//                   </button>
//                 </div>
//                 <div className="flex-1">
//                   <button
//                     onClick={handleNext}
//                     className="mt-4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 w-full rounded-md py-2"
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {currentStep === 5 && (
//             <div>
//               <div>
//                 <UploadImagewithcloudinarincomunity
//                   value={imageUrl}
//                   onchange={(url) => setImageUrl(url)}
//                 />

//                 <div className="text-xs text-gray-500 mt-2">
//                   {imageUrl ? (
//                     <h2>You Can modifie it By uploading another</h2>
//                   ) : (
//                     <h2>You Profile Picture will display here</h2>
//                   )}
//                 </div>
//                 {imageUrl && (
//                   <div className="flex justify-center mt-3 ">
//                     <Image
//                       src={imageUrl}
//                       alt="profilePicture"
//                       className="boreder-sm rounded-full "
//                       width={150}
//                       height={150}
//                     />
//                   </div>
//                 )}
//               </div>

//               <div className="flex items-center justify-center gap-x-3">
//                 <div className="flex-1">
//                   <button
//                     onClick={handelPrevious}
//                     className="mt-4 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 w-full rounded-md py-2"
//                   >
//                     Previous
//                   </button>
//                 </div>
//                 <div className="flex-1">
//                   <button
//                     onClick={handelSubmit}
//                     className="mt-4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 w-full rounded-md py-2"
//                   >
//                     submit
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//           {currentStep === 3 && (
//             <div>
//               <div className="flex flex-col gap-6">
//                 <div className="items-center justify-center gap-x-3">
//                   <Input
//                     placeholder="You subtitle"
//                     onChange={(e) => setSubtitle(e.target.value)}
//                     value={subtitle}
//                   />
//                   <div className="">
//                     <span className="text-xs text-gray-500">
//                       Add professionnel headline like "Software Engineer"
//                     </span>
//                   </div>
//                 </div>
//                 <div>
//                   <div className="flex items-center justify-between gap-x-3">
//                     <div className="flex-1 items-center">
//                       <Input
//                         placeholder="You patiants"
//                         value={patient}
//                         onChange={(e) => setPatient(e.target.value)}
//                       />
//                     </div>
//                     <button
//                       onClick={() => onpatientPuch(patient)}
//                       disabled={patient === ""}
//                       className="ml-4 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-1.5 py-1.5 text-center "
//                     >
//                       <Plus className="w-6 h-6 " />
//                     </button>
//                   </div>
//                   <div>
//                     <span className="text-xs text-gray-500">
//                       Add your patients like "devloppent web" or "design"
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-3">
//                 {patiants && (
//                   <div className="grid grid-cols-4 gap-x-2 gap-y-2">
//                     {patiants.map((option, index) => {
//                       if (option === null) return null;
//                       return (
//                         <Badge variant="outline" className="mt-2 p-1 relative">
//                           {option}
//                           <X
//                             onClick={() => {
//                               setPatiants((prev) => {
//                                 const updatedOptions = prev.filter(
//                                   (opt) => opt !== option
//                                 );

//                                 return updatedOptions;
//                               });
//                             }}
//                             size="18"
//                             className=" cursor-pointer absolute top-0 right-0"
//                           ></X>
//                         </Badge>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//               <div className="flex flex-row justify-between gap-3 items-center">
//                 <div className="flex-1">
//                   <button
//                     onClick={handelPrevious}
//                     className="mt-4 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 w-full rounded-md py-2"
//                   >
//                     Previews
//                   </button>
//                 </div>
//                 <div className="flex-1">
//                   <button
//                     onClick={handleNext}
//                     className="mt-4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 w-full rounded-md py-2"
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//           {currentStep === 4 && (
//             <div>
//               <Contact
//                 linkendin={linkedin}
//                 github={github}
//                 tiwitter={twitter}
//                 onlinkedinChange={(value) => setLinkedin(value)}
//                 ongithubChange={(value) => setGithub(value)}
//                 ontwitterChange={(value) => setTwitter(value)}
//               />

//               <div className="flex flex-row justify-between gap-3 items-center">
//                 <div className="flex-1">
//                   <button
//                     onClick={handelPrevious}
//                     className="mt-4 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 w-full rounded-md py-2"
//                   >
//                     Previews
//                   </button>
//                 </div>
//                 <div className="flex-1">
//                   <button
//                     onClick={handleNext}
//                     className="mt-4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 w-full rounded-md py-2"
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </AlertDialogContent>
//         <AlertDialogOverlay />
//       </AlertDialog>
//     </>
//   );
// };
