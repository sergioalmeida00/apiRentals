import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/erros/AppError";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createSpecificationUseCase:CreateSpecificationUseCase;
describe("Create Specification", () => {
    beforeAll(() => {
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
        createSpecificationUseCase = new CreateSpecificationUseCase(specificationsRepositoryInMemory);
    });

    it("should be able create a specification" , async () => {
        const specification = await createSpecificationUseCase.execute({
            description_specification:"George Hamilton",
            name_specification:"Brett Woods"
        });

        expect(specification).toHaveProperty('id_specification');
        expect(specification.name_specification).toEqual("Brett Woods");
    });

    it("should not be able  create specification name existing", async () => {

        await expect(async ()=>{
            await createSpecificationUseCase.execute({
                description_specification:"George Hamilton",
                name_specification:"Brett Woods"
            });
            await createSpecificationUseCase.execute({
                description_specification:"George Hamilton",
                name_specification:"Brett Woods"
            });
        }).rejects.toBeInstanceOf(AppError)
    })
})