"use server"
import { db } from '@/lib/db';
import { ProfileSchema } from "@/schemas";
import { z } from "zod";
import { auth } from '@/auth';
import { format } from 'date-fns';

type ProfileInformation={
    username:string;

    date:Date;
    optionSelected:string;
    imageUrl:string;
    about:string;
    country:{
        value:string;
        label:string;
        flag:string;
        region:string;
        lalng:number[];
    };
    subtitle:string;
    patients:string[];
    linkedin:string;
    github:string;
    twitter:string;
}

export const FillInformation=async(value:ProfileInformation)=>


{
    

    console.log("fill information")
    const user=await auth()
    const userId=user?.user.id
    if(!userId)
    {
        console.log("userId eeroor ")
        return {error:"unhotoriezd"}
    }
    console.log(value)

    const {username,date,optionSelected,about,imageUrl,country,subtitle,patients,linkedin,github,twitter}=value

    const existingOrigin=await db.origin.findFirst({
        where:{
            userId:userId
        }
    })
    if(existingOrigin)
    {
        await db.origin.updateMany({
            where:{
                userId:userId
            },
            data:{
                label:country?.label,
                value:country?.value,
                flag:country?.flag,
                region:country?.region,
                lalng:country?.lalng
            }
        })
       
        
      
        
        
    }
    else
    {
        await db.origin.create({
            data:{

                label:country?.label!,
                value:country?.value!,
                flag:country?.flag!,
                region:country?.region!,
                lalng:country?.lalng!,
                userId:userId
            }
        })
    }

    
  
    
    const updateUser=await db.user.updateMany({
        where:{
            id:userId
        },
        data:{
            username:username,
            DateOfBirth:date,
            filier:optionSelected,
            
            profileImage:imageUrl,
            about:about,
            patiants:patients,
            subtitle:subtitle,
            linkedin:linkedin,
            github:github,
            twitter:twitter


        }
    })
    if(!updateUser)
    {
        console.log("error updating user")
        return {error:"error updating user"}
    }
    
    return {success:true}
    
}