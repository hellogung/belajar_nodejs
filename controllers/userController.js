import { PrismaClient } from "@prisma/client"
import { generateUUID } from "../helpers/utils.js"

const prisma = new PrismaClient()

export const getUser = async (req, res) => {
    try {
        const user = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                posts: {
                    select: { title: true, content: true }
                },
            },
        })

        res.status(200).json({
            request_id: generateUUID(),
            message: "Successfully found",
            data: user
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getUserBy = async (req, res) => {
    const { id } = req.params

    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
            select: {
                id: true,
                name: true,
                email: true,
                posts: {
                    select: { title: true, content: true }
                },
            },
        })

        res.status(200).json({
            request_id: generateUUID(),
            message: "Successfully found",
            data: user
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createUser = async (req, res) => {
    const { name, email, title, bio } = req.body

    try {
        const response = await prisma.user.create({
            data: {
                name,
                email,
                posts: {
                    create: { title }
                },
                profile: {
                    create: { bio }
                }
            }
        })

        res.status(201).json({
            request_id: generateUUID(),
            message: "Successfully created",
            data: response
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params
    const payload = {
        name: req.body.name,
        email: req.body.email,
        title: req.body.title,
        bio: req.body.bio
    }

    try {
        const response = await prisma.user.update({
            where: {
                id: id
            },
            data: payload
        })
        res.status(200).json({
            request_id: generateUUID(),
            message: "Successfully updated",
            data: response
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        res.status(200).json({ user: `Deleted: ${req.params.id}` })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}