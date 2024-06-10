"use server"
import { getVerificationTokenByEmail } from '@/data/verification-token';
import {v4 as uuidv4} from 'uuid'
import { db } from './db';
import { getPasswordResetTokenByEmail } from '@/data/password-reset-token';


export const generatePasswordResetToken = async (email: string) => {
    
        const token=uuidv4()
        const expires=new Date(new Date().getTime()+3600 *1000);
        const existToekn=await getPasswordResetTokenByEmail(email)
        if(existToekn)
        {
            await db.passwordResetToken.delete({
                where:{
                    id:existToekn.id
                }
            })
        }
        const passwordResetToken=await db.passwordResetToken.create({
            data:{
                email,
                token,
                expires
            }
        })
        return passwordResetToken
    }

export const generateVerificationToken = async (email: string) => {
    
        const token=uuidv4()
        const expires=new Date(new Date().getTime()+3600 *1000);
        const existToekn=await getVerificationTokenByEmail(email)
        if(existToekn)
        {
            await db.verificationToken.delete({
                where:{
                    id:existToekn.id
                }
            })
        }
        const verficationToken=await db.verificationToken.create({
            data:{
                email,
                token,
                expires
            }
        })
        return verficationToken


    
}