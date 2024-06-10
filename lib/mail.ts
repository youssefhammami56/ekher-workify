import { emit } from "process"
import { sendRealMail } from "./real_mail/mail"




export const sendVerificationEmail=async(email:string,token:string)=>
{
    console.log("sending email")
    const confirmLink='http://localhost:3000/new-verification?token='+token
    await sendRealMail({
        
        to: email,
        name: email,
        subject: 'Confirm your email',
        body: `<p>Click <a href="${confirmLink}">here</a> to confirm your email</p>`,
    })


}

export const sendPasswordResetEmail=async(email:string,token:string)=>
{
    const resetLink='http://localhost:3000/reset-password?token='+token
    await sendRealMail({
        
        to: email,
        name: email,
        subject: 'Reset your password',
        body: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
    })
}