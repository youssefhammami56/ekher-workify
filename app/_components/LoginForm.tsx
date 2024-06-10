"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { LoginSchema, RegisterSchema } from "@/schemas";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "./Form-error";
import { FormSucces } from "./Form-succes";
import { useState, useTransition } from "react";
import { register } from "@/actions/register";
import { Loader, Slice, WavesIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { login } from "@/actions/login";
import { Social } from "./Social";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const errorParam =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Account not linked with this email"
      : "";

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [succes, setSucces] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",

      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    console.log(values);
    setError("");
    setSucces("");
    startTransition(() => {
      login(values).then((result: any) => {
        setError(result?.error);

        setSucces(result?.success);

        localStorage.setItem("email", values.email);
      });
    });
  };

  return (
    <div className=" flex min-h-screen bg-white ">
      <div className="flex w-full md:w-1/2 items-center justify-center p-12  ">
        <div className="w-full max-w-md border shadow-xl  rounded-lg p-6">
          <div className="flex justify-center mb-6"></div>
          <h2 className="text-3xl font-extrabold  text-center ">
            Welcome back
          </h2>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() => {})}
              className="mt-8 space-y-6 "
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
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <a href="/reset" className="px-2 bg-white text-gray-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>
              </div>
              <FormError message={error || errorParam} />
              <FormSucces message={succes} />
              <Button
                type="submit"
                disabled={isPending}
                onClick={form.handleSubmit(onSubmit)}
                className="w-full bg-indigo-600"
                variant={"primary"}
              >
                {isPending ? <Loader className="animate-spin" /> : "Sign in"}
              </Button>
            </form>
          </Form>
          <p className="mt-2 text-sm text-gray-600">
            Not a member?
            <Link
              className="font-medium text-indigo-600 hover:text-indigo-500"
              href="/sign-up"
            >
              Register and join us
            </Link>
          </p>
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
            <div className="w-full">
              <Social />
            </div>
          </div>
        </div>
      </div>
      <div
        className="hidden w-1/2 items-center justify-center bg-cover lg:flex"
        style={{
          backgroundImage: "url('/blue.jpg')",
          textAlign: "center",
        }}
      />
    </div>
  );
};
