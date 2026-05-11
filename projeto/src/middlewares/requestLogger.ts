import { Request, Response, NextFunction } from "express";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date();
    console.log(`[${timestamp.toISOString()}] ${req.method} ${req.path}`);
    next();
};
