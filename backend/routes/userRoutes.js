

import express from 'express';
import { createUser, deleteUserById, getAllUsers, updateUserById } from '../controller/userController.js';
const router = express.Router();


router.get('/get-all-users', getAllUsers)
router.post('/user', createUser)
router.patch('/user/:id', updateUserById)
router.delete('/user/:id', deleteUserById)


export default router


