import { auth } from "@config/auth";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

export class RefreshTokenController{
    async handle(request:Request, response:Response):Promise<Response>{

        const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

        const token = request.body.token || request.headers["x-access-token"] || request.query.token;

        const refresh_token = await refreshTokenUseCase.execute(token);

        return response.json(refresh_token);
    }
}