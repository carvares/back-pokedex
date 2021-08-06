import { Request,Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import Session from "../entities/Sessions";

export async function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization.split('Bearer ')[1]
    if(!token) return res.sendStatus(401);
    const user = await getRepository(Session).findOne({ where: { token } });
    if(!user) return res.sendStatus(401)
    res.locals.user = user
    next()
}

