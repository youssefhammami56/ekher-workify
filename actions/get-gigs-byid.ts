"use server"

import { db } from "@/lib/db"


export async function getGigsById(id:string)
{
    const gigs=await db.gigs.findUnique({
        where:{
            id:id
        },
        include:{
            createdBy:true,
            Reviews:{
                include:{
                    reviewer:true
                }
            }
        }
    })
    return gigs
}