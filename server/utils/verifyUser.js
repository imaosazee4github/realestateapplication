import { errorHandler } from "./error.js";
import Jwt from 'jsonwebtoken'

export const VerifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token) return next(errorHandler(400, 'Unauthorized'));

    Jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return next(errorHandler(403, 'Forbidden'));

        req.user = user;
        next();
    });


};