import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'

declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, data: null, error: 'UNAUTHORIZED' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) {
        return res.status(401).json({ success: false, data: null, error: 'UNAUTHORIZED' });
    }
    req.userId = (decoded as { userId: string }).userId;
    next();
}