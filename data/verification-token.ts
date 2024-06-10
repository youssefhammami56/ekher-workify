import { db } from "@/lib/db";


export const getVerificationTokenByEmail = async (email: string) => {
    const token=await db.verificationToken.findFirst({
        where:{
            email
        }
    })
    
    return token;
    }

export const getVerificationTokenByToken = async (token: string) => {
    try{
    const tokenData=await db.verificationToken.findFirst({
        where:{
            token
        }
    }
    

    )
    return tokenData;
    }catch(e)
    {
        return null
    }
        
    
    
    
    }