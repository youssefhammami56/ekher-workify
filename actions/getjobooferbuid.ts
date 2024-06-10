"use server"

import { db } from "@/lib/db"




export async function getJobOfferById(id:string) {
  const job = await db.job.findUnique({
    where: {
      id
    }
  })
  return job
}

export async function getRelatedjobthathavethesamecatergory(id:string)
{
  const job=await db.job.findMany({
    where:{
      id
    },
    select:{
      category:true
    }
  })
  const jobs=await db.job.findMany({
    where:{
      category:job[0].category
    }
  })
  return jobs
}