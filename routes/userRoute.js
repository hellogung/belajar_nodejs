import express from "express";
import { createUser, deleteUser, getUser, getUserBy, updateUser } from "../controllers/userController.js";
import { isAuthenticate } from "../middleware/auth.js";

const router = express.Router()

// Endpoint untuk mendapatkan semua user
router.route('/')
    .get(isAuthenticate, getUser)
    .post(isAuthenticate, createUser);

// Endpoint untuk operasi pada user berdasarkan ID
router.route('/:id')
    .get(isAuthenticate, getUserBy)
    .put(isAuthenticate, updateUser)
    .delete(isAuthenticate, deleteUser);

export default router