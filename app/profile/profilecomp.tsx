"use client";
import { getLoggedUser } from "@/actions/get-logged-user";
import { updateProfileData } from "@/actions/update-profiledata";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface ProfilecompProps {
  userInfo: Awaited<ReturnType<typeof getLoggedUser>>;
}
function Profilecomp({ userInfo }: ProfilecompProps) {
  const inputClassName =
    "block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500";
  const labelClassName =
    "mb-2 text-lg font-medium text-gray-900  dark:text-white";
  const [imageHover, setImageHover] = useState(false);
  const [initialusername, setInitialUsername] = useState(userInfo?.username);
  const [initialfullName, setInitialFullName] = useState(userInfo?.fullname);
  const [initialdescription, setInitialDescription] = useState(
    userInfo?.description
  );
  const router = useRouter();

  const handlefile = () => {};
  const [data, setData] = useState({
    userName: "",
    fullName: "",
    description: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const setProfile = async () => {
    await updateProfileData(
      initialusername!,
      initialdescription!,
      initialfullName!,
      
    );
    router.refresh();
  };
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-start min-h-[80vh] gap-3">
        <h2 className="text-3xl">Welocme to Workify </h2>
        <h4 className="text-xl">Please complete your profile to get started</h4>
        <div className="flex flex-col items-center w-full gap-5">
          <div className="flex flex-col items-center cursor-pointer">
            <label className={labelClassName} htmlFor="">
              Select a profile Picture
            </label>
            <div className="bg-purple-500 h-36 w-36 flex items-center justify-center rounded-full relative">
              {userInfo?.email ? (
                <Image
                  //   src={URL.createObjectURL(userInfo?.image)}
                  src="/bg-hero1.webp"
                  alt="profile"
                  fill
                  className="rounded-full"
                />
              ) : (
                <span className="text-6xl text-white">
                  {userInfo?.email[0].toUpperCase()}
                </span>
              )}
              <div
                className={`absolute bg-slate-400 h-full w-full rounded-full flex items-center justify-center   transition-all duration-100  ${
                  imageHover ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className={` flex items-center justify-center  relative`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-white absolute"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="file"
                    onChange={handleFile}
                    className="opacity-0"
                    multiple={true}
                    name="profileImage"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 w-[500px]">
            <div>
              <label className={labelClassName} htmlFor="userName">
                Please select a username
              </label>
              <input
                className={inputClassName}
                type="text"
                name="userName"
                id="userName"
                placeholder="Username"
                value={initialusername!}
                onChange={(e) => setInitialUsername(e.target.value)}
              />
            </div>

            <div>
              <label className={labelClassName} htmlFor="fullName">
                Please enter your full Name
              </label>
              <input
                className={inputClassName}
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Full Name"
                value={initialfullName!}
                onChange={(e) => setInitialFullName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col w-[500px]">
            <label className={labelClassName} htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={initialdescription!}
              onChange={(e) => setInitialDescription(e.target.value)}
              className={inputClassName}
              placeholder="Description"
            ></textarea>
          </div>
          <button
            className="border   text-lg font-semibold px-5 py-3   border-[#1DBF73] bg-[#1DBF73] text-white rounded-md"
            type="button"
            onClick={setProfile}
          >
            Set Profile
          </button>
        </div>
      </div>
    </>
  );
}

export default Profilecomp;
