import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router();
const userController = new UserController();

export const setUserRoutes = () => {
    router.post('/register', userController.registerUser.bind(userController));
    return router;
};