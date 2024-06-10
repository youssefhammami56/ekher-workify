"use server";

import { db } from "@/lib/db";

export async function deleteGigs(id: string) {
  try {
    // Delete related records if there are any foreign key constraints
    await db.orders.deleteMany({
      where: { gigId: id },
    });

    // Delete the gig
    await db.gigs.delete({
      where: { id: id },
    });

    return true;
  } catch (error) {
    console.error("Error deleting gig:", error);
    return false;
  }
}
