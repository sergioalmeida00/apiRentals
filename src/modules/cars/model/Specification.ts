import {v4 as uuidV4} from 'uuid';

export class Specification{
    id_specification?: string;
    name_specification: string;
    description_specification: string;
    created_at:Date;

    constructor(){
        if(!this.id_specification){
            this.id_specification = uuidV4();
        }        
    }
}