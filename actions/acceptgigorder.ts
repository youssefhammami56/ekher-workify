"use server"

import { db } from "@/lib/db"


export async function acceptgigorder(id:string) {
    const getthegigname=await db.orders.findUnique({
        where:{
            id
        },
        include:{
            gig:true,
            buyer:true
            
        }
    })
    const order = await db.orders.update({
        where:{
            id
        },
        data:{
            status:"ACCEPTED",
            startedAt:new Date(),
        }
    })
    const notif=await db.notifications.create({
        data:{
            message:"Your order for "+getthegigname!.gig.title+" has been accepted",
            userID:getthegigname!.buyer.id
        }
    })
    // const contract=await db.contarct.create({
    //     data:{
    //         jobApplicationId:getthegigname!.id,
    //         freelancerId:getthegigname!.sellerId,
    //         clientId:getthegigname!.buyerId,
    //         title:getthegigname?.gig.title!,
    //         price:getthegigname!.gig.price,
    //         description:getthegigname!.gig.description
    //     }
    // })
    return order
}
/*model Contarct {
  id               String         @id @default(uuid())
  jobApplicationId String
  jobApplication   JobApplication @relation(fields: [jobApplicationId], references: [id])
  freelancerId     String
  freelancer       User           @relation("frellencer", fields: [freelancerId], references: [id])
  clientId         String
  client           User           @relation("client", fields: [clientId], references: [id])
  title            String
  description      String
  price            Int
  createdAt        DateTime       @default(now())
  updatedAt        DateTime       @updatedAt
}
*/