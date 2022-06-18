import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/erros/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let carRepositoryInMemory:CarRepositoryInMemory;
let createCarSpecificationUseCase:CreateCarSpecificationUseCase;
let specificationsRepositoryInMemory:SpecificationsRepositoryInMemory;

describe("Create Car Specification",()=>{

    beforeEach(()=>{
        carRepositoryInMemory = new CarRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory()
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carRepositoryInMemory,specificationsRepositoryInMemory);
    })

    it("Should not be able to add a new specification to a now-existent car", async()=>{
        expect( async()=>{
            const car_id = "1234";
            const specification_id = ["54321"];
            await createCarSpecificationUseCase.execute({
                car_id,
                specification_id
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should be able to add a new specification to a car", async()=>{
        
        const car = await carRepositoryInMemory.create({
            name:"CarSérgio",
            description:"Create Car",
            daily_rate:100, 
            license_plate:"ABC-123", 
            fine_amount:60,
            brand:"GOL",
            category_id:"CategorySérgio"
        });

        const specification = await specificationsRepositoryInMemory.create({
            description_specification:"Test Description",
            name_specification:"TEst name Description"
        })
        
        const specificationCar = await createCarSpecificationUseCase.execute({
            car_id:car.id,
            specification_id:[specification.id_specification],
        })

        expect(specificationCar).toHaveProperty("specifications");
        expect(specificationCar.specifications.length).toBe(1);
    });
    
});