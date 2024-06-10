"use server"
import { db } from "@/lib/db";

export async function getAllCommunity() {
  return await db.community.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include:{
      posts:{
        select:{
          id:true
        }
    }
  }
  });
 
  
  
  
}