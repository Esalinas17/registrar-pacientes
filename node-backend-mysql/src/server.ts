// src/server.ts
import express from 'express';
import cors from 'cors'; // Para permitir peticiones desde tu frontend
import userRoutes from './routes/userRoutes';
// Importa 'pool' para asegurar que la configuración de DB se ejecute al inicio si es necesario.
import './config/db'; 

const app = express();
const PORT = process.env.PORT || 3001; // Puerto para el backend

app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json()); // Middleware para parsear JSON en las peticiones

app.use('/api', userRoutes); // Prefijo para tus rutas de API, ej: /api/users

app.get('/', (req, res) => {
    res.status(200).json({ message: 'API de Registro de Pacientes corriendo correctamente!' });
});


app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
