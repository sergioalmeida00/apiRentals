import "reflect-metadata";
import express, {NextFunction, Request, Response } from 'express';
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import swaggerFile from '../../../swagger.json';
import { router } from '@shared/infra/http/routes/index';
import createConnection from '@shared/infra/typeorm';
import "@shared/container"
import { AppError } from "@shared/erros/AppError";

const app = express();

app.use(express.json());
app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);
createConnection();

// TRATAMENTO DE ERROR
app.use(
    (err:Error, request:Request, response:Response, next: NextFunction) =>{
        if(err instanceof AppError){
            return response.status(err.statusCode).json({
                message:err.message
            });        
        }
        return response.status(500).json({
            status:"error",
            message:`Internal server error - ${err.message}`
        });
    
    }
);

export {app}
