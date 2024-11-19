/**
 * Constructs a public URL by appending the given path to the base URL.
 *
 * @param {string} path - The path to be appended to the base URL.
 * @returns {string} The full public URL.
 */
export const getPublicUrl = (path: string): string => {
    return `${process.env.BASE_URL}/${path}`;
};