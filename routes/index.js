import express from "express";
import userRoutes from "./userRoute.js"
import authRoutes from "./authRoute.js"

const router = express.Router()

router.get("/", (req, res) => {
    res.send("🟢 SERVER ON")
})

router.use("/user", userRoutes)
router.use("/auth", authRoutes)


export default router