"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export const Social = () => {
  const connect = (data: string) => {
    signIn(data, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };

  return (
    <div className="flex justify-between items-center ">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => {
          connect("google");
        }}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => {
          connect("github");
        }}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};
