import { Connection, createConnection } from "typeorm";
import request from "supertest";
import {v4 as uuidV4} from "uuid";
import {hash} from "bcrypt";
import {app} from "@shared/infra/http/app";

let connection:Connection;

describe("Create Category Controller", ()=>{

    beforeAll(async()=>{
        connection = await createConnection();
        await connection.runMigrations();


        const id = uuidV4();
        const password = await hash("admin",8);

        await connection.query(
            `INSERT INTO USERS(id,name,email, password, "isAdmin", created_at, driver_license)
             VALUES ( '${id}', 'admin','admin@rentex.com.br', '${password}', true, 'now()','XXXXXXX' ) `
        );
    });

    afterAll(async()=>{
        await connection.dropDatabase();
        await connection.close();
    })

    it("Should be able to create a new category", async()=>{
        const responseToken = await request(app).post("/sessions")
        .send({
            email:"admin@rentex.com.br",
            password:"admin"
        });
        const {token} = responseToken.body;

       const response = await request(app).post("/categories")
       .send({
            name:"Test a new Category",
            description:"Categorias de Carros SUV"
       })
       .set({
            Authorization:`Bearer ${token}`
       });

       expect(response.status).toBe(201);
    });

    it("Should not be able to create a new category with name exists",async()=>{
        const responseToken = await request(app).post("/sessions")
        .send({
            email:"admin@rentex.com.br",
            password:"admin"
        });

        const {token} = responseToken.body;

       const response = await request(app).post("/categories")
       .send({
            name:"Test a new Category",
            description:"Categorias de Carros SUV"
       })
       .set({
            Authorization:`Bearer ${token}`
       });

       expect(response.status).toBe(400);
    })
    
});