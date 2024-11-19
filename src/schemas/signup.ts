import { z } from "zod";

const errorMessages = {
    name: {
        required: "Name is required",
        min: "Name must be at least 2 characters long",
        max: "Name must be at most 255 characters long"
    },
    email: {
        required: "Email is required",
        invalid: "Email must be a valid email address"
    },
    password: {
        required: "Password is required",
        min: "Password must be at least 6 characters long",
        max: "Password must be at most 255 characters long"
    }
};

export const signUpSchema = z.object({
    name: z
        .string({ required_error: errorMessages.name.required })
        .min(2, { message: errorMessages.name.min })
        .max(255, { message: errorMessages.name.max }),
    email: z
        .string({ required_error: errorMessages.email.required })
        .email({ message: errorMessages.email.invalid }),
    password: z
        .string({ required_error: errorMessages.password.required })
        .min(6, { message: errorMessages.password.min })
        .max(255, { message: errorMessages.password.max })
});