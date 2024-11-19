import express from "express"
import { router as pingRouter } from "./ping"
import { router as authRouter } from "./auth"
import { router as userRouter } from "./user"
import { router as tweetRouter } from "./tweet"

const router = express.Router();

router.use("/ping", pingRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/tweet", tweetRouter);

router.get("/feed");
router.get("/search");
router.get("/trending");
router.get("/suggestions");

export default router;