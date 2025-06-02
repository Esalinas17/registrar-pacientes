// src/controllers/userController.ts
import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';
import { User } from '../types/user';

export class UserController {
    private userModel: UserModel;

    constructor(userModel: UserModel) {
        this.userModel = userModel;
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            console.log('Intentando crear un nuevo usuario con los datos:', req.body); // Mensaje de log añadido
            const newUser: User = req.body;
            // Aquí deberías añadir validaciones más robustas para los datos de entrada
            if (!newUser.name || !newUser.rut) {
                res.status(400).json({ message: 'Nombre y RUT son obligatorios.' });
                return;
            }
            await this.userModel.createUser(newUser);
            res.status(201).json({ message: 'Usuario creado exitosamente.', user: newUser });
        } catch (error: any) {
            console.error('Error al crear usuario:', error);
            if (error.code === 'ER_DUP_ENTRY') { // Ejemplo de manejo de RUT duplicado
                 res.status(409).json({ message: 'El RUT ya está registrado.' });
            } else {
                 res.status(500).json({ message: 'Error interno del servidor al crear usuario.' });
            }
        }
    }

    async findUserByRUT(req: Request, res: Response): Promise<void> {
        try {
            const { rut } = req.params;
            const user = await this.userModel.findUserByRUT(rut);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'Usuario no encontrado.' });
            }
        } catch (error) {
            console.error('Error al buscar usuario:', error);
            res.status(500).json({ message: 'Error interno del servidor al buscar usuario.' });
        }
    }

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userModel.findAllUsers();
            res.status(200).json(users);
        } catch (error) {
            console.error('Error al obtener todos los usuarios:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener usuarios.' });
        }
    }
}
