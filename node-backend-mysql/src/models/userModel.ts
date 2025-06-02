import { Pool, RowDataPacket } from 'mysql2/promise';
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
        // Especificamos que esperamos un array de RowDataPacket
        const [rows] = await this.db.execute<RowDataPacket[]>(query, [rut]);
        if (rows.length > 0) {
            return rows[0] as User; // Hacemos un type assertion a User
        }
        return null;
    }

    async findAllUsers(): Promise<User[]> {
        const query = `SELECT id, name, rut, address, medication, dosage, age, contact, healthFacility, pathology FROM users ORDER BY name ASC`; // Added id and other fields
        // Especificamos que esperamos un array de RowDataPacket
        const [rows] = await this.db.execute<RowDataPacket[]>(query);
        return rows as User[]; // Hacemos un type assertion a User[]
    }
}