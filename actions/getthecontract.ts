"use server"

import { db } from "@/lib/db"
import { Inclusive_Sans } from "next/font/google"



export async function getContractByApplyId(id:string)

{
    const contract=await db.contarct.findFirst({
        where:{
            jobApplicationId:id
        },
        include:{
            jobApplication:{
                include:{
                    job:{
                        include:{
                            createdBy:true
                        }
                    }
                }
            },
            freelancer:true
    }
    })

    return contract
}