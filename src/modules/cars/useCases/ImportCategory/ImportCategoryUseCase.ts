
import fs from 'fs';
import { parse } from 'csv-parse';
import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';


interface ImportCategory{
    name:string;
    description:string;
}
export class ImportCategoryUseCase{

    private categoryRepository:CategoriesRepository;

    constructor(categoryRepository:CategoriesRepository){
        this.categoryRepository = categoryRepository
    }

    private loadCategories(file:Express.Multer.File):Promise<ImportCategory[]>{

        return new Promise((resolve,reject)=>{

            
            const stream = fs.createReadStream(file.path);
            const categories:ImportCategory[] = [];
            const parseFile = parse();
            stream.pipe(parseFile);

            parseFile.on("data",async (line)=>{
                const[name, description] = line;

                categories.push({
                    name,
                    description
                });
            }).on("end",()=>{
                resolve(categories);
            }).on("error",(err)=>{
                reject(err);
            });
        });
    }

    async execute(file:Express.Multer.File):Promise<void>{
        const categories = await this.loadCategories(file);

        categories.map(async (category) => {

            const{name,description} = category;
            const categoyAlreadyExists = this.categoryRepository.findByCategory(name);

            if(!categoyAlreadyExists){
                this.categoryRepository.create({
                    name,
                    description
                });
            }

        });
    }

}