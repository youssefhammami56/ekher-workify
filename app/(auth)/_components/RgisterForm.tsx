"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormLabel, FormItem, FormMessage, FormField } from "@/components/ui/form";
import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "./Form-error";
import { FormSucces } from "./Form-succes";
import { useState, useTransition } from "react";
import { register } from "@/actions/register";
import { Loader } from "lucide-react";
import Link from "next/link";
import UploadPhotoProfile from "@/app/landingpage/UploadPhotoProfile";
import Image from "next/image";
import { Social } from "./Social";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [succes, setSucces] = useState<string | undefined>("");
  const [imageUrl, setImageUrl] = useState<string>("" as string);

  const [selected, setSelected] = useState<string>("CLIENT");
  const onChange = () => {
    setSelected(selected === "CLIENT" ? "FREELANCER" : "CLIENT");
  };

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      role: "CLIENT",
      imageUrl: "",
    },
  });
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    values.role = selected;
    values.imageUrl = imageUrl;
    setError("");
    setSucces("");
    startTransition(() => {
      register(values).then((result: any) => {
        setError(result?.error);
        setSucces(result?.succes);
      });
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-8">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-400 mb-6">
              Welcome to Workify
            </h2>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              aria-disabled={isPending}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Email"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.email?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Username"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="*******"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.password?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <div>
                Do you want to register as a{" "}
                <span
                  onClick={onChange}
                  className="font-bold text-gradient-to-r from-cyan-500 to-blue-400 cursor-pointer"
                >
                  {selected}
                </span>
              </div>
              {form.formState.errors.imageUrl && (
                <FormMessage>
                  {form.formState.errors.imageUrl?.message}
                </FormMessage>
              )}
              {imageUrl && (
                <div className="flex justify-center">
                  <Image
                    src={imageUrl}
                    width={100}
                    height={100}
                    className="rounded-full"
                    alt="photo-profile"
                  />
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-sm"></div>
                </div>
              </div>
              <FormError message={error} />
              <FormSucces message={succes} />
              <Button
                type="submit"
                disabled={isPending}
                onClick={form.handleSubmit(onSubmit)}
                className="w-full bg-blue-400"
                variant="primary"
              >
                {isPending ? <Loader className="animate-spin" /> : "Register"}
              </Button>
            </form>
          </Form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="mt-6">
              <Social />
            </div>
            <span className="text-sm text-gray-600">
              <Link
                className="font-medium text-gradient-to-r from-cyan-500 to-blue-400"
                href="/sign-in"
              >
                Already have an account? Sign in
              </Link>
            </span>
          </div>
        </div>
        <div className="hidden lg:block lg:w-1/2">
          <img src="/blue.png" alt="Blue illustration" className="rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
};
