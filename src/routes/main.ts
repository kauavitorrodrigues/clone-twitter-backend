import express from "express"
import { router as pingRouter } from "./ping"

const router = express.Router()

router.use("/ping", pingRouter)

export default router