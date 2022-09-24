interface IMailProvider{
    sendMail(to:String, subject:string, variables:any, path:string):Promise<void>;
}

export {IMailProvider}