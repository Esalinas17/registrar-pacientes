-- c:\Users\Alejandro\Documents\GitHub\productos_app\registrar-pacientes\node-backend-mysql\mysql-init-scripts\init.sql
-- Asegúrate de que la base de datos correcta esté seleccionada.
-- La variable MYSQL_DATABASE en docker-compose ya crea la base de datos,
-- así que aquí solo necesitamos usarla.
USE esteban4229_db; -- Reemplaza con el valor de DB_APP_DATABASE_NAME si es diferente

-- Crear la tabla de usuarios si no existe
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    rut VARCHAR(20) NOT NULL UNIQUE,
    address TEXT,
    medication TEXT,
    dosage VARCHAR(100),
    age INT,
    contact VARCHAR(100),
    healthFacility VARCHAR(255),
    pathology TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Puedes añadir datos iniciales si lo deseas:
-- INSERT INTO users (name, rut, age, contact, healthFacility, pathology) VALUES
-- ('Usuario de Prueba 1', '11111111-1', 30, '123456789', 'Hospital Central', 'Hipertensión'),
-- ('Usuario de Prueba 2', '22222222-2', 45, '987654321', 'Clínica Sur', 'Diabetes');