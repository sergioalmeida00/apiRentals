import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import {v4 as uuidV4} from 'uuid';


@Entity("specifications")
export class Specification{

    @PrimaryColumn("")
    id_specification?: string;

    @Column()
    name_specification: string;

    @Column()
    description_specification: string;

    @CreateDateColumn()
    created_at:Date;

    constructor(){
        if(!this.id_specification){
            this.id_specification = uuidV4();
        }        
    }
}