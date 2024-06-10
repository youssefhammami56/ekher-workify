"use client";
import { createCommunity } from "@/actions/create-new-community";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { categories } from "@/utils/categories";

// Define the type for categories if not defined already
interface Category {
  name: string;
}

export function DialogDemo() {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleCreateCommunity = async () => {
    if (title === "" || category === "") {
      toast.error("Please fill all the fields");
      return;
    }

    console.log("Creating community with title:", title, "and category:", category);

    try {
      const response = await createCommunity(title, category);
      console.log("Community creation response:", response);
      toast.success("Community created successfully");
      setIsOpen(false); // Close the dialog
      router.refresh(); // Refresh the page
    } catch (error) {
      toast.error("Failed to create community");
      console.error("Error creating community:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full p-2 cursor-pointer bg-blue-500 text-white"
          variant={"outline"}
          onClick={() => setIsOpen(true)}
        >
          Create Community
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle >Create Community</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new community.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={title}
              className="col-span-3"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label htmlFor="categories" className="text-right">
              Category
            </Label>
            <select
              id="categories"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 col-span-3"
              name="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              aria-label="Select a category"
            >
              <option value="">Choose </option>
              {categories.map(({ name }: Category) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreateCommunity} variant={"blue"}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
