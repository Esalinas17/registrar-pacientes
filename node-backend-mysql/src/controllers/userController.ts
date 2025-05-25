import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';
import { User } from '../types/user';

export class UserController {
    private userModel: UserModel;

    constructor() {
        this.userModel = new UserModel();
    }

    public async registerUser(req: Request, res: Response): Promise<void> {
        const userData: User = req.body;

        try {
            const newUser = await this.userModel.createUser(userData);
            res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (error) {
            res.status(500).json({ message: 'Error registering user', error: error.message });
        }
    }
}