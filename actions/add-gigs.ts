"use server"

import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function addGigs(gigData:any) {
    try {
        const user = await auth();
        const userId = user?.user.id;
        console.log("user", userId);
        console.log("gigData", gigData);

        await db.gigs.create({
            data: {
                ...gigData,
                userId: userId!
            }
        });

    } catch (e) {
        console.error("Error adding gig:", e);
        return null;
    }
}
