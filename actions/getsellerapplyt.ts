"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { getmygigsincludetheirrevneue } from "./dashboard/getmygigsincludetheirrevnue"



export async function getsellerapply()
{
    const user=await auth()
    const userId=user?.user.id
    const gigsrevenue=await db.orders.findMany({
        where:{
            gig:{
                userId:userId
            },
            isCompleted:true
            // isAccepted:true
            
        },
        include:{
            gig:{
                select:{
                    title:true,
                    price:true
                }
            },
            }
    })
    const jobofferrevenue=await db.jobApplication.findMany({
        where:{
            job:{
                userId:userId
            },
            status:"accepted"
            
        },
        include:{
            job:{
                select:{
                    title:true,
                    price:true
                }
            }
        }
    })
    console.log("job"+jobofferrevenue)
        //@ts-ignore

    const tottalrevnuecountinalltheorders=gigsrevenue.reduce((acc,order)=>acc+order.gig.price,0)
        //@ts-ignore

    const tottalrevnuecountinallthejoboffer=jobofferrevenue.reduce((acc,order)=>acc+order.job.price,0)
        //@ts-ignore

    const tabofrevenue=[{name:"Gigs",value:tottalrevnuecountinalltheorders},{name:"Job Offers",value:tottalrevnuecountinallthejoboffer}]
        //@ts-ignore


    return tabofrevenue
    

}


export async function getSellerrevenuefromjobofferbymonth()
{
    const user=await auth()
    const userId=user?.user.id
    const jobofferrevenue=await db.jobApplication.findMany({
        where:{
            job:{
                userId:userId
            },
            status:"accepted"
            
        },
        include:{
            job:{
                select:{
                    title:true,
                    price:true
                }
            }
        }
    })
    const months=["January","February","March","April","May","June","July","August","September","October","November","December"]
    //@ts-ignore
    const tabofrevenue=months.map((month)=>{
          //@ts-ignore

        const totalrevenue=jobofferrevenue.reduce((acc,order)=>{
              //@ts-ignore

            if(order.createdAt.getMonth()===months.indexOf(month))
            {
                  //@ts-ignore

                return acc+order.job.price
            }
                //@ts-ignore

            return acc
        },0)
            //@ts-ignore

        return {name:month,value:totalrevenue}
    })
        //@ts-ignore

    console.log(tabofrevenue)
        //@ts-ignore

    return tabofrevenue

}


export async function getTotalrevenuefromgigsandjoboffer()
{
    const user=await auth()
    const userId=user?.user.id
        //@ts-ignore

    const revenueeachgigs=await getmygigsincludetheirrevneue()
        //@ts-ignore

    const revenuefromgigs=revenueeachgigs.reduce((acc,gig)=>acc+gig.revenue,0)
        //@ts-ignore

    const revenuefromjobofferbymonth=await getSellerrevenuefromjobofferbymonth()
        //@ts-ignore

    const revenuefromjoboffer=revenuefromjobofferbymonth.reduce((acc,joboffer)=>acc+joboffer.value,0)
        //@ts-ignore

    const totalrevenue=revenuefromgigs+revenuefromjoboffer
        //@ts-ignore

    return totalrevenue

}

export async function getCompletedOrder()
{
      //@ts-ignore

    const totalcompletedorderwithrevenue=await getmygigsincludetheirrevneue()
        //@ts-ignore

    const totalorder=totalcompletedorderwithrevenue.reduce((acc,order)=>acc+order.Orders.length,0)
        //@ts-ignore

    return totalorder
}
export async function getPendingOrder() {
    const user = await auth();
    const userId = user?.user.id;
  
    const gigs = await db.gigs.findMany({
      where: {
        Orders: {
          some: {
            completedAt: null,
            startedAt: { not: null },
          },
        },
  
        createdBy: {
          id: userId,
        },
      },
      include: {
        Orders: {
          where: {
            completedAt:null
          },
        },
      },
    });
        //@ts-ignore

    const pendingorder=gigs.reduce((acc,gig)=>acc+gig.Orders.length,0)
        //@ts-ignore

    return pendingorder
}
export async function orderrequest() {
    const user = await auth();
    const userId = user?.user.id;
  
    const gigs = await db.gigs.findMany({
      where: {
        Orders: {
          some: {
            completedAt: null,
            startedAt:null
          },
        },
  
        createdBy: {
          id: userId,
        },
      },
      include: {
        Orders: {
          where: {
            completedAt:null
          },
        },
      },
    });
        //@ts-ignore

    const pendingorder=gigs.reduce((acc,gig)=>acc+gig.Orders.length,0)
        //@ts-ignore

    return pendingorder
}


   
  