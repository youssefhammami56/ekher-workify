"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Car } from "lucide-react";
import Link from "next/link";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}
export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <h2 className="text-2xl font-bold">{headerLabel}</h2>
      </CardHeader>
      <CardContent>{children}</CardContent>

      <CardFooter>
        <Link href={backButtonHref}>
         {backButtonLabel}
        </Link>
      </CardFooter>
    </Card>
  );
};
