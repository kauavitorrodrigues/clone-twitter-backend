import { Prisma, User } from "@prisma/client";
import { prisma } from "../utils/prisma";
import { getPublicUrl } from "../utils/url";

/**
 * Retrieves a user by their email address.
 *
 * @param {string} email - The email address of the user to retrieve.
 * @returns {Promise<User | null>} A promise that resolves to the user object with public URLs for avatar and cover, or null if no user is found.
 */
export const getUserByEmail = async (email: string): Promise<User | null> => {

    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (user) {
        return {
            ...user,
            avatar: getPublicUrl(user.avatar),
            cover: getPublicUrl(user.cover)
        }
    }

    return null;

};

/**
 * Retrieves a user by their slug.
 *
 * @param {string} slug - The unique identifier for the user.
 * @returns A promise that resolves to the user object with public URLs for avatar and cover, or null if no user is found.
 */
export const getUserBySlug = async (slug: string) => {

    const user = await prisma.user.findUnique({
        select: {
            avatar: true,
            cover: true,
            slug: true,
            name: true,
            bio: true,
            link: true
        },
        where: { slug }
    });

    if (user) {
        return {
            ...user,
            avatar: getPublicUrl(user.avatar),
            cover: getPublicUrl(user.cover)
        };
    }

    return null;

};

/**
 * Creates a new user in the database.
 *
 * @param {Prisma.UserCreateInput} data - The data for creating a new user.
 * @returns {Promise<User>} The created user object with public URLs for avatar and cover.
 */
export const createUser = async (data: Prisma.UserCreateInput): Promise<User> => {
    
    const user = await prisma.user.create({ data });

    return {
        ...user,
        avatar: getPublicUrl(user.avatar),
        cover: getPublicUrl(user.cover)
    };

};