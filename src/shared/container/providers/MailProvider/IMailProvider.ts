interface IMailProvider{
    sendMail(to:String, subject:string, body:string):Promise<void>;
}

export {IMailProvider}