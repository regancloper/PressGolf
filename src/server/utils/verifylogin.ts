import { RequestHandler, Request } from 'express';

export const isLoggedIn: RequestHandler = (req: ReqUser, res, next) => {
    if (!req.user || (req.user.role !== 'admin') || (Number(req.params.id) !== req.user.id)) {
        return res.sendStatus(401);
    } else {
        return next();
    }
}

interface ReqUser extends Request {
    user: {
        id: number;
        role: string;
    };
}