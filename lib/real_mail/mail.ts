import nodemailer from 'nodemailer'
export async function sendRealMail({to,name,subject,body}:{to:string;name:string;subject:string;body:string})
{
    const {SMTP_EMAIL,SMTP_PASSWORD}=process.env
    const  transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:SMTP_EMAIL,
            pass:SMTP_PASSWORD
        }
    })
    try{
        const testresult=await transporter.verify()
        console.log('Connected to email server')
    }catch(e)
    {
        console.log(e)
    }
    try{
        const sendResult=await transporter.sendMail({
            from:SMTP_EMAIL,
            to,
            subject,
            html:body
        })
    }catch(e)
    {
        console.log(e)
    }
}