import { Specification } from "../../model/Specification";


interface SpecificationDTO{
    name_specification: string;
    description_specification:string;
}

export class SpecificationRepository{

    private specifications: Specification[];

    private static INSTANCE:SpecificationRepository;


    constructor(){
        this.specifications = [];
    }

    public static getInstance():SpecificationRepository{
      if(!SpecificationRepository.INSTANCE){
        SpecificationRepository.INSTANCE = new SpecificationRepository();
      }
      return SpecificationRepository.INSTANCE;
    }

    create({name_specification,description_specification}:SpecificationDTO){
        const specification = new Specification();

        Object.assign(specification,{
            name_specification,
            description_specification,
            created_at: new Date()
        });

        this.specifications.push(specification);

        return specification;
    }

    findBySpecification(name:string):Specification{
        const specification = this.specifications.find(specification => specification.name_specification === name );
        // console.log("encontrou " + name)
        return specification;
    }

    listSpecification():Specification[]{
       return this.specifications;
    }
}