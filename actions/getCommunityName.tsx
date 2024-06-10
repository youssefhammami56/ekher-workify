"use server"

import { db } from "@/lib/db"

export  async function getCommNameByid(id:string){
    const community=await db.community.findUnique({
        where:{
            id
        }
    })
    return community?.title
}