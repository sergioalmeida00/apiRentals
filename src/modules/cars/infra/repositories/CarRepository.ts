import { ICreateDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";

export class CarRespository  implements ICarRepository{

    private repository: Repository<Car>;

    constructor(){
        this.repository = getRepository(Car);
    }


    async create({name,description, daily_rate, license_plate, fine_amount,brand,category_id,specifications,id}: ICreateDTO): Promise<Car> {
        const car = this.repository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
            specifications,
            id
            });
        await this.repository.save(car);
        
        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({where:{license_plate}});
        return car;
    }

    async findAvailable(category_id?: string, brand?: string, name?: string): Promise<Car[]> {
        
        const carQuery = await this.repository.createQueryBuilder("c")
        .where("available = :available", {available:true});

        if(category_id){
            carQuery.andWhere("category_id = :category_id", {category_id});
        }

        if(brand){
            carQuery.andWhere("UPPER(brand) = UPPER(:brand)", { brand });
        }

        if(name){
            carQuery.andWhere("UPPER(name) = UPPER(:name)", { name });
        }

        const cars = await carQuery.getMany();

        return cars;
    }

    async findById(car_id: string): Promise<Car> {
        const car = await this.repository.findOne({where:{id:car_id}});
        return car;
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        await this.repository
        .createQueryBuilder()
        .update()
        .set({ available })
        .where("id = :id")
        .setParameters({ id })
        .execute();
    }

 
}