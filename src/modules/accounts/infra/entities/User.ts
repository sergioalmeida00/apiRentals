import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import {v4 as uuidV4} from 'uuid';
import { UserToken } from './UserTokens';

@Entity("users")
export class User{
    
    @PrimaryColumn()
        id?:string;
    @Column()
        name: string;
    @Column()
        password: string;
    @Column()
        email: string;
    @Column()
        driver_license:string;
    @Column()
        isAdmin:boolean;

    @Column()
        avatar:string;

            
    @CreateDateColumn()
        created_at:Date;

    constructor(){
        if(!this.id){
            this.id = uuidV4();
        }
    }
}