"use server"

import { db } from "@/lib/db";



export async function deletejoboffer(id:string)
{
    await db.job.delete({
        where: { id: id },
      });
      return true;
      
}