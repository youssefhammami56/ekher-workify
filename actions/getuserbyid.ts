"use server"

import { db } from "@/lib/db";


export async function getuserById(id:string) {
    try {
        const user = await db.user.findUnique({
            where: {
                id
            },
            include:{
                origin:true
            }
        });
        return user;
    } catch (e) {
        console.error("Error getting user by id:", e);
        return null;
    }
    
}