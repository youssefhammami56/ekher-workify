"use server"

import { db } from "@/lib/db"

type GetGigs={
    
    q?:string
    category?:string
   

}

export async function getGigsByFilter({q,category}:GetGigs)
{
    const gigs=await db.gigs.findMany({
        where:{
            OR:[
                {
                    title:{
                        contains:q?q:""
                    }
                },
                {
                    description:{
                        contains:q?q:""
                    }
                },
                
            ]
        },
        include:{
            createdBy:true,
            Reviews:true
            
        }
    })
    return gigs
}