"use server"

import { db } from "@/lib/db";

export async function getUsersInCommunity(communityId: string) {
    return await db.community.findMany({
        
        where: {
        id:communityId,
        },
        include: {
            posts:{
                include:{
                    user:{
                        select:{
                            username:true,
                            email:true,
                            id:true,
                            profileImage:true
                        }
                    }
                }
            }
        },
        
    });
    
    }


   export async function getAllusersInComunityById(communityId: string) {
    const users= await db.post.findMany({
        distinct:["userId"],
        where:{
            communityId:communityId
        },
        include:{
            user:true
        }
    });
    //@ts-ignore
    const userIncludePostsCount=Promise.all(users.map(async user=>{
            //@ts-ignore

        const postsCount=await db.post.count({
                //@ts-ignore

            where:{
                    //@ts-ignore

                userId:user.userId
            }
        })
            //@ts-ignore

        return {...user,postsCount}
    }))
        //@ts-ignore

    
   
    return userIncludePostsCount

    
    
    }