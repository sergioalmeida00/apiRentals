import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";
import {v4 as uuidV4} from 'uuid';

@Entity("users_tokens")
export class UserToken{
    @PrimaryColumn()
    id?:string;

    @Column()
    refresh_token:string;

    @Column()
    user_id:string

    @ManyToOne(type => User, usersTokens => UserToken)
    user:User

    @Column()
    expires_date:Date;

    @CreateDateColumn()
    created_at:Date;

    constructor(){
        if(!this.id){
            this.id = uuidV4();
        }
    }
}