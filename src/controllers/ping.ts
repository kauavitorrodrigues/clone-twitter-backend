import { Request, Response } from "express";
import { ExtendedRequest } from "../types/ExtendedRequest";

export const ping = (req: Request, res: Response) => {
    res.json({ pong: true });
}

export const privatePing = (req: ExtendedRequest, res: Response) => {
    res.json({ pong: true, user: req.userSlug });
}