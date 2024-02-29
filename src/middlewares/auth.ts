import { NextFunction, Request, Response } from "express";
import { isAuthenticated, decodeToken } from "../helpers/authHelpers";
import { TokenPayload } from "../core-typings/TokenPayload";

export default {
    checkToken: async (req: Request, res: Response, next: NextFunction) => {
        const authToken = req.headers["authorization"]?.split(" ")[1];
        if (authToken) {
            try {
                console.log("auth token", authToken);
                const decode: TokenPayload = await decodeToken(authToken);
                if (decode && decode.userId && decode.exp && isAuthenticated(decode.exp)) {
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