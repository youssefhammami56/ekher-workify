import { Input } from "@/components/ui/input";
import { Github, LinkedinIcon, Search, Twitter } from "lucide-react";
import React from "react";

interface ContactProps {
  linkendin: string;
  github: string;
  tiwitter: string;
  onlinkedinChange: (value: string) => void;
  ongithubChange: (value: string) => void;
  ontwitterChange: (value: string) => void;
}

export default function Contact({
  linkendin,
  github,
  tiwitter,
  onlinkedinChange,
  ongithubChange,
  ontwitterChange,
}: ContactProps) {
  return (
    <div>
      <div className="space-y-6 mt-6">
        <div className="flex relative  pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200">
          <LinkedinIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-slate-500" />
          <div className="flex flex-col w-full space-y-4">
            <Input
              placeholder="Link to your LinkedIn profile"
              value={linkendin}
              onChange={(e) => {
                onlinkedinChange(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex relative  pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200">
          <Github className="absolute top-1/2 left-3 transform -translate-y-1/2 text-slate-500" />
          <div className="flex flex-col w-full space-y-4">
            <Input
              placeholder="Link to your GitHub profile"
              value={github}
              onChange={(e) => {
                ongithubChange(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex relative  pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200">
          <Twitter className="absolute top-1/2 left-3 transform -translate-y-1/2 text-slate-500" />
          <div className="flex flex-col w-full space-y-4">
            <Input
              placeholder="Link to your Twitter profile"
              value={tiwitter}
              onChange={(e) => {
                ontwitterChange(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
