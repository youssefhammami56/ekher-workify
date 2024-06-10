"use client";

import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useState, useTransition } from "react";
import { Reset } from "@/actions/reset";

import { useSearchParams } from "next/navigation";
import { NewPasswordSchema } from "@/schemas";
import { z } from "zod";
import { newPassword } from "@/actions/newPassword";
import { FormError } from "../(auth)/_components/Form-error";
import { FormSucces } from "../(auth)/_components/Form-succes";
import { CardWrapper } from "./Card-wrapper";

export const NewPasswordForm = () => {
  const searchParam = useSearchParams();
  const token = searchParam.get("token");

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [succes, setSucces] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSucces("");
    if (!token) {
      setError("Invalid tokennnnnnnnnn");
      return;
    }
    startTransition(() => {
      newPassword(values, token).then((result) => {
        setError(result?.error);
        setSucces(result?.succes);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Rest you password"
      backButtonLabel="back To login"
      backButtonHref="/sign-in"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})} className="space-y-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">
                    Please enter a new Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.password?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSucces message={succes} />
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
            variant="primary"
            onClick={form.handleSubmit(onSubmit)}
          >
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
