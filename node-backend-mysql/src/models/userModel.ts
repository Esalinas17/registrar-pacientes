export interface User {
    name: string;
    rut: string;
    address: string;
    medication: string;
    dosage: string;
    age: number;
    contact: string;
    healthFacility: string;
    pathology: string;
}

import { Pool } from 'mysql2/promise';
import { User } from '../types/user';

export class UserModel {
    private db: Pool;

    constructor(db: Pool) {
        this.db = db;
    }

    async createUser(user: User): Promise<void> {
        const query = `INSERT INTO users (name, rut, address, medication, dosage, age, contact, healthFacility, pathology) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        await this.db.execute(query, [user.name, user.rut, user.address, user.medication, user.dosage, user.age, user.contact, user.healthFacility, user.pathology]);
    }

    async findUserByRUT(rut: string): Promise<User | null> {
        const query = `SELECT * FROM users WHERE rut = ?`;
        const [rows] = await this.db.execute(query, [rut]);
        return rows.length > 0 ? rows[0] : null;
    }
}