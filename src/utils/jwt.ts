import jwt from "jsonwebtoken";

/**
 * Creates a JSON Web Token (JWT) with the given slug.
 *
 * @param {string} slug - The slug to be included in the JWT payload.
 * @returns {string} The generated JWT.
 */
export const createJwt = (slug: string): string => {
    return jwt.sign({ slug }, process.env.JWT_SECRET as string);
};