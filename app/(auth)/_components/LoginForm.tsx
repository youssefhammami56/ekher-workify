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
import { LoginSchema } from "@/schemas";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "./Form-error";
import { FormSucces } from "./Form-succes";
import { useState, useTransition } from "react";
import { login } from "@/actions/login";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-8">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-400 mb-6">
              Welcome back
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
              <div className="mt-6 text-center">
                <a href="/reset" className="text-sm text-gray-500">
                  Forgot your password?
                </a>
              </div>
              <FormError message={error || errorParam} />
              <FormSucces message={succes} />
              <Button
                type="submit"
                disabled={isPending}
                onClick={form.handleSubmit(onSubmit)}
                className="w-full bg-blue-400"
                variant={"primary"}
              >
                {isPending ? <Loader className="animate-spin" /> : "Sign in"}
              </Button>
            </form>
          </Form>
          <p className="mt-2 text-sm text-gray-600 text-center">
            Not a member?{" "}
            <Link
              className="font-medium text-blue-400 hover:text-blue-400"
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
            <div className="mt-6">
              <Social />
            </div>
          </div>
        </div>
        <div className="hidden lg:block lg:w-1/2">
          <img src="/blue.png" alt="Blue illustration" className="rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
};
