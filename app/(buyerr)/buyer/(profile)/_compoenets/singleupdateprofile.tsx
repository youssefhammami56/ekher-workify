"use client";
import { useState } from "react";
import {
  CountrySelect,
  CountrySelectValue,
} from "@/app/landingpage/country-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import UploadImagewithcloudinarincomunity from "@/app/(buyerr)/buyer/(community)/community/_componets/comunity-upload-image copy";
import Contact from "@/app/landingpage/contact";
import { getLoggedUser } from "@/actions/getloggeduser";
import { FillInformation } from "@/actions/fill-information";
import { toast, Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";

interface SingleUpdateProfileProps {
  user: Awaited<ReturnType<typeof getLoggedUser>>;
}

function SingleUpdateProfile({ user }: SingleUpdateProfileProps) {
  const initialDate = user?.DateOfBirth
    ? new Date(user?.DateOfBirth)
    : new Date();
  const initialFilier = user?.filier ? user?.filier : "";
  const initialImageUrl = user?.profileImage ? user?.profileImage : "";
  const initialeAbout = user?.about ? user?.about : "";
  const initialeOrigin = user?.origin || {
    id: "",
    userId: "",
    value: "",
    label: "",
    flag: "",
    region: "",
    lalng: [0, 0],
  };

  const [optionSelected, setOptionSelected] = useState<string>(initialFilier);
  const initialSubtitle = user?.subtitle ? user?.subtitle : "";
  const initialPatients = user?.patiants ? user?.patiants : [];
  const initialLinkin = user?.linkedin ? user?.linkedin : "";
  const initialgithub = user?.github ? user?.github : "";
  const initialtwitter = user?.twitter ? user?.twitter : "";

  const [date, setDate] = useState<Date>(initialDate);
  const [about, setAbout] = useState<string>(initialeAbout);
  const [imageUrl, setImageUrl] = useState<string>(initialImageUrl);
  const [isloading, setIsloading] = useState(false);
  const [origin, setOrigin] = useState<any>(initialeOrigin);
  const [patiants, setPatiants] = useState<string[]>(initialPatients);
  const [subtitle, setSubtitle] = useState<string>(initialSubtitle);
  const [linkedin, setLinkedin] = useState<string>(initialLinkin);
  const [github, setGithub] = useState<string>(initialgithub);
  const [twitter, setTwitter] = useState<string>(initialtwitter);

  const handelSubmit = async () => {
    setIsloading(true);
    const data = {
      username: user?.username!,
      date: date as Date,
      optionSelected: optionSelected as string,
      imageUrl: imageUrl as string,
      country: origin as CountrySelectValue,
      about: about as string,
      subtitle: subtitle as string,
      patients: patiants as string[],
      linkedin: linkedin as string,
      github: github as string,
      twitter: twitter as string,
    };
    await FillInformation(data)
      .then((res: any) => {
        if (res.success) {
          toast.success("Profile Information Added Successfully");
        } else {
          toast.error(res.error);
        }
      })
      .then(() => {
        setIsloading(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-4 text-center text-blue-400">Your profile</h2>
        <p className="text-gray-500 text-center mb-8">
          Provide your information to get started.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {imageUrl && (
              <div className="flex justify-center">
                <img
                  src={imageUrl}
                  alt="Profile Picture"
                  className="h-24 w-24 rounded-full"
                />
              </div>
            )}
            <div>
              <Label htmlFor="location">Location</Label>
              <CountrySelect
                value={origin}
                /* @ts-ignore */
                onChange={(value) => setOrigin(value)}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                className="h-32"
                id="bio"
                placeholder="Tell us about yourself"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex flex-col space-y-2">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input value={user?.email} disabled />
              </div>
              <div>
                <Label htmlFor="username">Username</Label>
                <Input value={user?.username!} disabled />
              </div>
            </div>
            <div>
              <Label htmlFor="contact">Contact Information</Label>
              <Contact
                linkendin={linkedin}
                github={github}
                tiwitter={twitter}
                onlinkedinChange={(value) => setLinkedin(value)}
                ongithubChange={(value) => setGithub(value)}
                ontwitterChange={(value) => setTwitter(value)}
              />
            </div>
            <div>
              <Label htmlFor="profile-picture">Profile Picture</Label>
              <div className="h-32 w-full rounded-lg border-2 border-dashed border-gray-300 p-4">
                <div className="flex h-full items-center justify-center">
                  <UploadImagewithcloudinarincomunity
                    value={imageUrl}
                    onchange={(url) => setImageUrl(url)}
                  />
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="date-picker">Date of Birth</Label>
              <div className="bg-gray-50 border border-gray-300 rounded-lg p-2">
                <DatePicker
                  selected={date}
                  onChange={(date: Date) => setDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className="w-full rounded-md border border-gray-300 p-2"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                variant={"primary"}
                onClick={handelSubmit}
                disabled={isloading}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default SingleUpdateProfile;

