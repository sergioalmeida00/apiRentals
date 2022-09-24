import { IMailProvider } from "../IMailProvider";
import nodemailer,{Transporter} from 'nodemailer';
import { AppError } from "@shared/erros/AppError";

export class EtherealMailProvider implements IMailProvider{

    private client:Transporter
    constructor(){
        this.createAccount();
    }

    async createAccount(){
        try {
            const account = await nodemailer.createTestAccount();
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });
            this.client = transporter;
        } catch (error) {
                throw new AppError(`${error}`);                
        }
    }

    async sendMail(to: string, subject: string, body: string): Promise<void> {
        const message = await this.client.sendMail({
            to,
            from:"Rentx <noreplay@rentex.com.br>",
            subject,
            text:body,
            html:body
        });

        console.log('Message sent: %s', message.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }

}