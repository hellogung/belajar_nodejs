import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import express from "express";
import { generateUUID } from "../helpers/utils.js";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../helpers/jwt.js"

const router = express.Router()
const prisma = new PrismaClient

// Endpoint untuk mendapatkan semua user
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body

    try {
        const passwordHashed = bcrypt.hashSync(password, 10)

        const response = await prisma.user.create({
            data: {
                name,
                email,
                password: passwordHashed
            }
        })

        res.status(201).json({
            request_id: generateUUID(),
            message: "User Created",
            data: response
        })
    } catch (error) {
        res.json({ message: error.message })
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        const passwordIsValid = bcrypt.compareSync(password, user.password)

        if (!passwordIsValid || !user) {
            return res.status(401).json({
                request_id: generateUUID(),
                message: "Email/Password invalid",
            })
        }

    const accessToken = generateAccessToken(email)
    const refreshToken = generateRefreshToken(email)

        res.status(200).json({
            request_id: generateUUID(),
            message: "Login Successful",
            accessToken,
            refreshToken
        })
    } catch (error) {
        res.json({ message: error.message })
    }
})

router.post("/token", (req, res) => {
    const { email, refreshToken } = req.body
    const isValid = verifyToken(email, refreshToken)

    if (!isValid) { return res.status(401).json({ message: "Invalid token,try login again" }) }

    const accessToken = generateAccessToken(email)

    return res.status(200).json({ accessToken })
})

router.get("/me", (req, res) => {
    res.send("first")
})

export default router