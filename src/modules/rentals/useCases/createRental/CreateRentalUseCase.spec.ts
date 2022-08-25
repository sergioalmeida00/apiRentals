import dayjs from "dayjs";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/erros/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";

let createRentalUseCase:CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayJsProvider:DayjsDateProvider;
let carsRepositoryInMemory:CarRepositoryInMemory;

describe("Create Rental", ()=>{
    const dayAdd24Hours = dayjs().add(1,'day').toDate();
    beforeEach(()=>{
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayJsProvider = new DayjsDateProvider();
        carsRepositoryInMemory = new CarRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayJsProvider,carsRepositoryInMemory);
    });

    it("Should be able to create a new rental", async() => {

        const car = await carsRepositoryInMemory.create({
            name:"Car test",
            description:"Car test",
            daily_rate: 100,
            license_plate:"test",
            fine_amount:50,
            category_id:"4321",
            brand:"brand"
        });
        console.log(car.id)

        const rental = await createRentalUseCase.execute({
            user_id:"12",
            car_id:car.id,
            expected_return_date:dayAdd24Hours          
        });
        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });
    
    it(" should not be able to create a new rental if there is another open to the same user ", async () => {
        await rentalsRepositoryInMemory.create({
            user_id: "12345",
          car_id: "1111",
          expected_return_date: dayAdd24Hours,
        });
    
        await expect(
          createRentalUseCase.execute({
            user_id: "12345",
            car_id: "121212",
            expected_return_date: dayAdd24Hours,
          })
        ).rejects.toBeInstanceOf(AppError);
      });
      it(" should not be able to create a new rental if there is another open to the same car ", async () => {
        await rentalsRepositoryInMemory.create({
          car_id: "test",
          expected_return_date: dayAdd24Hours,
          user_id: "12345",
        });
    
        await expect(
          createRentalUseCase.execute({
            user_id: "321",
            car_id: "test",
            expected_return_date: dayAdd24Hours,
          })
        ).rejects.toBeInstanceOf(AppError);
      });

    it("Should not be able to create a new rental with invalid return time.",async ()=>{
        expect(async ()=>{
            await createRentalUseCase.execute({
                user_id:"123536",
                car_id:"teste",
                expected_return_date:dayjs().toDate()
            })
        }).rejects.toBeInstanceOf(AppError);

    })
})