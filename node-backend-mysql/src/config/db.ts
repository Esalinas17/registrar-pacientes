// src/config/db.ts
import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'tu_contraseña',
    database: process.env.DB_NAME || 'nombre_tu_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

console.log('Intentando conectar a la base de datos...');
pool.getConnection()
    .then(connection => {
        console.log('Conexión a la base de datos establecida exitosamente.');
        connection.release();
    })
    .catch(err => {
        console.error('Error al conectar con la base de datos:', err.stack);
    });
