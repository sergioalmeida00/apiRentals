import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { AppError } from "@shared/erros/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase:CreateCarUseCase;
let carRepository:CarRepositoryInMemory;
describe('Creat Car', ()=>{

    beforeEach(()=>{
        carRepository = new CarRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carRepository);
    });
    
    it("Should be able to create a new car", async ()=>{
        const car = await createCarUseCase.execute({
            name:"Car",
            description:"Create Car",
            daily_rate:1, 
            license_plate:"ABC-123", 
            fine_amount:100,
            brand:"GOL",
            category_id:"Category"
        });
        expect(car).toHaveProperty("id")
    });

    it("Should not be able to create a car with exists license plate",async ()=>{
       await expect(async()=>{
            await createCarUseCase.execute({
                name:"Car1",
                description:"Create Car",
                daily_rate:1, 
                license_plate:"ABC-123", 
                fine_amount:100,
                brand:"GOL",
                category_id:"Category"
            });

           await createCarUseCase.execute({
                name:"Car2",
                description:"Create Car",
                daily_rate:1, 
                license_plate:"ABC-123", 
                fine_amount:100,
                brand:"GOL",
                category_id:"Category"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to create a car with available true by defalt", async ()=>{
        const car =  await createCarUseCase.execute({
            name:"Car76",
            description:"Create Car",
            daily_rate:100, 
            license_plate:"ABC-123", 
            fine_amount:60,
            brand:"GOL",
            category_id:"Category"
        });
        expect(car.available).toBe(true)
    });
})