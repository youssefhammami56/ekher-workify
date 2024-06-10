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
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useState, useTransition } from "react";

import { Label } from "@/components/ui/label";
import { FormError } from "../(auth)/_components/Form-error";
import { FormSucces } from "../(auth)/_components/Form-succes";
import { ResetSchema } from "@/schemas";
import { Reset } from "@/actions/reset";

export const ResetForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [succes, setSucces] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSucces("");
    startTransition(() => {
      Reset(values).then((result) => {
        setError(result?.error);
        setSucces(result?.succes);

        localStorage.setItem("email", values.email);
      });
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-8">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-500 mb-4">Password Recovery</h1>
            <p className="text-gray-500 mb-6">
              Enter the email address associated with your account, and we’ll email you a link to reset your password.
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              <FormError message={error} />
              <FormSucces message={succes} />
              <Button
                type="submit"
                className="w-full"
                disabled={isPending}
                variant="primary"
              >
                Reset Password
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <a href="/sign-in" className="px-2 bg-white text-gray-500">
                  Back to sign in
                </a>
              </div>
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
