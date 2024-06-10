"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"


export async function createJobOffer(title:string, description:string, category:string, price:number,expertises:string[],shordtDescription:string,imagesrc:string) {
    const user=await auth()
    const userId=user?.user.id
    console.log("category",category )
  const job = await db.job.create({
    data: {
      title,
      description,
      category,
      price,
      expertise:expertises,
      userId:userId!,
      shortDesc:shordtDescription,
      imagesrc:imagesrc
    

    }
  })
  return job
}


/*model Job {
  id          String   @id @default(cuid())
  title       String
  description String
  category    String
  price       Int
  createdAt   DateTime @default(now())
  userId      String
  createdBy   User     @relation(fields: [userId], references: [id])
  isCompleted Boolean  @default(false)
  
  
}*/