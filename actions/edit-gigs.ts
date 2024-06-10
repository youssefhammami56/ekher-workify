"use server"

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { parse } from "path";


export async function editGigs(gigData:any) {
    try {
        const user = await auth();
        const userId = user?.user.id;
        console.log("user", userId);
        console.log("gigData", gigData);
        console.log(typeof gigData.price)
        console.log(typeof gigData.revisions)
        console.log(typeof gigData.deliveryTime)
        const price=parseInt(gigData.price)
        const revisions=parseInt(gigData.revisions)
        const deliveryTime=parseInt(gigData.deliveryTime)

        await db.gigs.update({
            where: {
                id: gigData.id
            },
            data: {
                ...gigData,
                userId: userId!,
                price: price,
                revisions: revisions,
                deliveryTime: deliveryTime
            }
        });

    } catch (e) {
        console.error("Error adding gig:", e);
        return null;
    }
}