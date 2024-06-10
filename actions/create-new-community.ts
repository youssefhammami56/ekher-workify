"use server";

import { db } from "@/lib/db";

export async function createCommunity(name: string, category: string) {
  const community = await db.community.create({
    data: {
      title: name,
      category: category, // Include the category field
    },
  });
  return community;
}
