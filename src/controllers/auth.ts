import slug from "slug";
import { compare, hash } from "bcrypt-ts";
import { RequestHandler } from "express";
import { signUpSchema } from "../schemas/signup";
import * as user from "../services/user";
import { createJwt } from "../utils/jwt";
import { signInSchema } from "../schemas/signin";

/**
 * Handles user signup process.
 *
 * This function validates the received data, checks if the user already exists,
 * generates a unique slug for the user, hashes the password, creates a new user,
 * generates a JWT token, and returns the response with the token and user details.
 *
 * @param req - The request object containing the user signup data.
 * @param res - The response object to send the response.
 *
 * @returns A JSON response with the JWT token and user details if successful,
 *          or an error message if validation fails or the user already exists.
 */
export const signup: RequestHandler = async (req, res) => {

    const body = signUpSchema.safeParse(req.body);

    if (!body.success) {
        res.status(400).json({
            error: body.error.flatten().fieldErrors,
        });
        return;
    }

    const isPreviousUser = await user.getUserByEmail(body.data.email);

    if (isPreviousUser) {
        res.status(400).json({
            error: "User already exists",
        });
        return;
    }

    let genSlug = true;
    let userSlug = slug(body.data.name);

    while (genSlug) {

        const doesUserHasAnSlug = await user.getUserBySlug(userSlug);

        if (doesUserHasAnSlug) {
            let userSlugSuffix = Math.floor(Math.random() * 999999).toString();
            userSlug = slug(`${body.data.name}${userSlugSuffix}`);
        } else {
            genSlug = false;
        }

    }

    const hashedPassword = await hash(body.data.password, 10);

    const newUser = await user.createUser({
        slug: userSlug,
        name: body.data.name,
        email: body.data.email,
        password: hashedPassword
    });

    const token = createJwt(userSlug);

    res.status(201).json({
        token,
        user: {
            name: newUser.name,
            slug: newUser.slug,
            avatar: newUser.avatar
        }
    });

};

/**
 * Handles user sign-in requests.
 * 
 * This function validates the received data, checks if the user exists,
 * verifies the password, generates a JWT token, and returns the response.
 * 
 * @param req - The request object containing the user credentials.
 * @param res - The response object to send the result of the sign-in process.
 * 
 * @returns A JSON response with a JWT token and user information if successful,
 *          or an error message if the sign-in process fails.
 */
export const signin: RequestHandler = async (req, res) => {

    const body = signInSchema.safeParse(req.body);

    if (!body.success) {
        res.status(401).json({
            error: body.error.flatten().fieldErrors,
        });
        return;
    }

    const userFound = await user.getUserByEmail(body.data.email);

    if (!userFound) {
        res.status(401).json({
            error: "Access denied",
        });
        return;
    }

    const isPasswordCorrect = await compare(body.data.password, userFound.password);

    if (!isPasswordCorrect) {
        res.status(401).json({
            error: "Access denied",
        });
        return;
    }

    const token = createJwt(userFound.slug);

    res.status(200).json({
        token,
        user: {
            name: userFound.name,
            slug: userFound.slug,
            avatar: userFound.avatar
        }
    });

};