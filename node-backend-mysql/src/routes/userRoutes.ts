// src/routes/userRoutes.ts
import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { UserModel } from '../models/userModel';
import { pool } from '../config/db'; // Asegúrate que la ruta sea correcta

const router = Router();

const userModel = new UserModel(pool);
const userController = new UserController(userModel);

// Endpoint para crear un nuevo usuario
router.post('/users', userController.createUser.bind(userController));

// Endpoint para buscar un usuario por RUT
router.get('/users/:rut', userController.findUserByRUT.bind(userController));

export default router;
