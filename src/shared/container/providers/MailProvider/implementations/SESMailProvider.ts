import { IMailProvider } from "../IMailProvider";
import sgMail from '@sendgrid/mail';
import {readFile} from 'fs/promises';
import handlebars from 'handlebars';

export class SESMailProvider implements IMailProvider{

    constructor(){
        this.account();
    }

    async account(){
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    }

    async sendMail(to: String, subject: string, variables: any, path: string): Promise<void> {
        const templateMail = await readFile(path, 'utf-8');
        const templateParse = handlebars.compile(templateMail);
        const templateHTML = templateParse(variables);

        try{
            const result = await sgMail.send({
                to:String(to),
                from:"Rentx <sergioalmeidaa00@gmail.com>",
                subject,
                html:templateHTML
            });
            console.log(`Email sent: ${result}`);
        }catch(error){
            console.log(error);
        }
  
    }
}