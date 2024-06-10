"use server"

import { db } from "@/lib/db"



export async function getFirstCommunity()
{
    {
        const community=await db.community.findFirst({
            orderBy:{
                createdAt:"asc"
            }
        })
        return community
    }
}