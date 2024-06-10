"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"


export async function editJobOffer(id:string,title:string, description:string, category:string, price:number,expertises:string[],shordtDescription:string) {
    
  const job = await db.job.update({
    where:{
        id:id
    },
    data: {
      title,
      description,
      category,
      price,
      expertise:expertises,
      shortDesc:shordtDescription
     
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