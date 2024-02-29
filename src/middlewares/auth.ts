import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../helpers/authHelpers";
import { JwtPayload } from "jsonwebtoken";
import { TokenPayload } from "../core-typings/TokenPayload";

export default {
    checkToken: async (req: Request, res: Response, next: NextFunction) => {
        const authToken = req.headers["authorization"]?.split(" ")[1];
        if (authToken) {
            try {
                console.log("auth token", authToken);
                const decode: TokenPayload = await verifyToken(authToken);
                if (decode && decode.userId) {
                    req.userId = decode.userId;
                    next();
                } else {
                    res.status(401).send({
                        sucess: false,
                        message: "Unauthorized (401)"
                    });
                }
            } catch (error) {
                res.status(401).send({
                    sucess: false,
                    message: "Unauthorized (401)"
                });
            }
        } else {
            res.status(401).send({
                sucess: false,
                message: "Unauthorized (401)"
            });
        }

    }
}