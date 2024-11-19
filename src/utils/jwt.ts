import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getUserBySlug } from "../services/user";
import { ExtendedRequest } from "../types/ExtendedRequest";

/**
 * Creates a JSON Web Token (JWT) with the given slug.
 *
 * @param {string} slug - The slug to be included in the JWT payload.
 * @returns {string} The generated JWT.
 */
export const createJwt = (slug: string): string => {
    return jwt.sign({ slug }, process.env.JWT_SECRET as string);
};

/**
 * Middleware function to verify JSON Web Token (JWT) from the request headers.
 * 
 * This function checks for the presence of an authorization header in the request.
 * If the header is not present, it responds with a 401 status and an "Access denied" error.
 * If the header is present, it extracts the token and verifies it using the JWT secret.
 * 
 * If the token is invalid or verification fails, it responds with a 401 status and an "Access denied" error.
 * If the token is valid, it retrieves the user associated with the token's slug.
 * If the user is not found, it responds with a 401 status and an "Access denied" error.
 * If the user is found, it attaches the user's slug to the request object and calls the next middleware function.
 * 
 * @param req - The extended request object containing headers and userSlug.
 * @param res - The response object used to send back the desired HTTP response.
 * @param next - The next middleware function in the stack to be called if the token is valid.
 */
export const verifyJwt = (req: ExtendedRequest, res: Response, next: NextFunction) => {

    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        res.status(401).json({ error: "Access denied." });
        return;
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(
        token, 
        process.env.JWT_SECRET as string, 
        async (err, decoded: any) => {

            if (err) {
                res.status(401).json({ error: "Access denied." });
                return;
            }

            const user = await getUserBySlug(decoded.slug);

            if (!user) {
                res.status(401).json({ error: "Access denied." });
                return;
            }

            req.userSlug = user.slug;

            next();

        }

    );
    
};