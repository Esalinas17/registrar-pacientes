// src/types/user.ts
export interface User {
    id?: number; // Opcional, si lo manejas en el backend/DB
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
