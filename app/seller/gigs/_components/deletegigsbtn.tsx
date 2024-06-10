"use client";

import { deleteGigs } from "@/actions/deleteGigs"; // Adjust the path according to your project structure
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogOverlay,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface ConfirmModelProps {
  gigsId: string;
}

export const ConfirmModel = ({ gigsId }: ConfirmModelProps) => {
  const router = useRouter();
  const onDelete = async (id: string) => {
    await deleteGigs(id);
    router.refresh();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center gap-x-2" asChild>
        <Button className="rounded-full p-4 " size="sm" variant="ghost">
          <TrashIcon className="h-4 w-4" />
          <span>Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-96 bg-white">
        <AlertDialogTitle>Delete Gigs</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this gig?
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 text-white"
            onClick={() => {
              onDelete(gigsId);
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
      <AlertDialogOverlay />
    </AlertDialog>
  );
};
