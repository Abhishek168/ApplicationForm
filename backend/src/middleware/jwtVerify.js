import jwt from 'jsonwebtoken';
import { errorResponse } from '../helpers';
require("dotenv").config();

const jwtVerify = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            res.status(401).send({ error: "Please authenticate using a valid token" })
        }
        let finalToken = token.split(" ")
        const data = jwt.verify(finalToken[1], process.env.JWT_SECRET);
        req.user = data;
        return next();
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}


module.exports = jwtVerify;
