import { createPool } from 'mysql2/promise';

const pool = createPool({
    host: 'mysql', // This should match the service name in docker-compose.yml
    user: 'root',
    password: 'your_password', // Replace with your MySQL root password
    database: 'your_database', // Replace with your database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export const connectDatabase = async () => {
    try {
        await pool.getConnection();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
};

export default pool;