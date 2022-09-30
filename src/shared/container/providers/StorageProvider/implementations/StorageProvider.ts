import { IStorageProvider } from "../IStorageProvider";
import fs from 'fs';
import {resolve} from 'path';
import upload from "@config/upload";

export class StorageProvider implements IStorageProvider{
   async  save(file: string, folder: string): Promise<String> {
        await  fs.promises.rename(
            resolve(upload.tmpFolder,file),
            resolve(`${upload.tmpFolder}/${folder}`, file)
         )

         return file;
    }
   async delete(file: string, folder: string): Promise<void> {
        const fileName = resolve(`${upload.tmpFolder}/${folder}`,file);

        try {
            await fs.promises.stat(fileName);
        } catch (error) {
            return error
        }

        await fs.promises.unlink(fileName)
    }

}