import { IStorageProvider } from "../IStorageProvider";
import {S3} from 'aws-sdk';
import upload from "@config/upload";
import {resolve} from 'path';
import fs from 'fs/promises';
import mime from "mime";

export class S3StorageProvider implements IStorageProvider{

    private client:S3;
    constructor(){
        this.client = new S3({
            region:process.env.AWS_BUCKET_REGION
        });
    }

   async save(file: string, folder: string): Promise<String> {
        const originalName = resolve(upload.tmpFolder, file);
        const fileContent = await fs.readFile(originalName);

        const ContentType = mime.getType(originalName);
        await this.client.putObject({
            Bucket:`${process.env.AWS_BUCKET}/${folder}`,
            Key:file,
            ACL:"public-read",
            Body:fileContent,
            ContentType
        }).promise();

        await fs.unlink(originalName);

        return file;

    }
    async delete(file: string, folder: string): Promise<void> {
        await this.client.deleteObject({
            Bucket:`${process.env.AWS_BUCKET}/${folder}`,
            Key:file
        }).promise();
    }

}