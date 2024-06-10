"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"



export async function getcategdistinct()
{
    const user=await auth()
    const userId=user?.user.id
    const sellerapply=await db.jobApplication.findMany({
        where:{
            userId:userId,
            // isAccepted:true
        },include:{
            job:{
                select:{
                    category:true
                }
            }
        }
    })
    //@ts-ignore
    const graficdesign=sellerapply.filter((item)=>item.job.category=="Graphic Design").length
        //@ts-ignore

    const digitalmarketing=sellerapply.filter((item)=>item.job.category=="Digital Marketing").length
        //@ts-ignore

    const videoanimation=sellerapply.filter((item)=>item.job.category=="Video & Animation").length
        //@ts-ignore

    const programmingtech=sellerapply.filter((item)=>item.job.category=="Programming & Tech").length
        //@ts-ignore

    const business=sellerapply.filter((item)=>item.job.category=="Business").length
        //@ts-ignore

    const lifestyle=sellerapply.filter((item)=>item.job.category=="Lifestyle").length
        //@ts-ignore

    const categwithcount=[
        {name:"Graphic Design",count:graficdesign},
        {name:"Digital Marketing",count:digitalmarketing},
        {name:"Video & Animation",count:videoanimation},
        {name:"Programming & Tech",count:programmingtech},
        {name:"Business",count:business},
        {name:"Lifestyle",count:lifestyle},
    
    ]
        //@ts-ignore

    return categwithcount

}

/*export const categories = [
  { name: "Graphic Design", logo: "/service-1.svg" },
  { name: "Digital Marketing", logo: "/service-2.svg" },
  { name: "Video & Animation", logo: "/service-4.svg" },
  { name: "Programming & Tech", logo: "/service-6.svg" },
  { name: "Business", logo: "/service-7.svg" },
  { name: "Lifestyle", logo: "/service-8.svg" },
];
*/