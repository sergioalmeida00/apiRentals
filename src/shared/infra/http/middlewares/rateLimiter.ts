import redis from "redis";
import { createClient } from "redis";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { NextFunction, Request, Response } from "express";
import { AppError } from "@shared/erros/AppError";



export async function rateLimiter(request:Request,response:Response, next:NextFunction):Promise<void>{

    const redisClient = createClient({
        legacyMode:true,
        socket:{
            host:  process.env.REDIS_HOST ,
            port: Number(process.env.REDIS_PORT),
        }
      });

      await redisClient.connect();

      const limiter = new RateLimiterRedis({
        storeClient: redisClient,
        keyPrefix: 'rateLimiter',
        points: 10, // 10 requests
        duration: 5, // per 1 second by IP
      });
      

      try {

        await limiter.consume(request.ip);
        return next();

      } catch (err) {

        throw new AppError('Too many request', 429);

      }

}