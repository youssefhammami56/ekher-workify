"use server"

import { db } from "@/lib/db";


export async function getPostsInCommunity(communityId: string) {
    return await db.post.findMany({
       
        where: {
        communityId,
        },
        include: {
            user: true,
            PostResponse: {
                include: {
                    user: true,
                    
                }
            }

        },
        orderBy: {
        createdAt: "desc",
        },
    });
    
    }