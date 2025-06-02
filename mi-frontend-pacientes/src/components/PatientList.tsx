// src/components/PatientList.tsx
import React, { useState, useEffect } from 'react';
import styles from './PatientList.module.css'; // We'll create this CSS module next

// Reusing the User interface, ensure it's consistent with your data structure
// Or import it if you've moved it to a shared types file
interface User {
    id?: number; // Assuming your backend returns an ID for each patient
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

const PatientList: React.FC = () => {
    const [patients, setPatients] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchPatients = async () => {
            setIsLoading(true);
            setError('');
            try {
                // Adjust the URL to your backend endpoint for fetching all patients
                const response = await fetch('http://localhost:3001/api/users');
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                const data: User[] = await response.json();
                setPatients(data);
            } catch (err) {
                console.error("Failed to fetch patients:", err);
                if (err instanceof Error) {
                    setError(`No se pudieron cargar los pacientes: ${err.message}`);
                } else {
                    setError('No se pudieron cargar los pacientes. Error desconocido.');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchPatients();
    }, []); // Empty dependency array means this effect runs once on mount

    if (isLoading) {
        return <p className={styles.loadingMessage}>Cargando pacientes...</p>;
    }

    if (error) {
        return <p className={`${styles.message} ${styles.errorMessage}`}>{error}</p>;
    }

    if (patients.length === 0) {
        return <p className={styles.noPatientsMessage}>No hay pacientes registrados.</p>;
    }

    return (
        <div className={styles.listContainer}>
            <h2>Pacientes Registrados</h2>
            <table className={styles.patientTable}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>RUT</th>
                        <th>Edad</th>
                        <th>Contacto</th>
                        <th>Patología</th>
                        <th>Medicación</th>
                        {/* Add more headers as needed */}
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient, index) => (
                        // Using RUT as key if ID is not available, but prefer a unique ID
                        <tr key={patient.id || patient.rut || index}>
                            <td>{patient.name}</td>
                            <td>{patient.rut}</td>
                            <td>{patient.age}</td>
                            <td>{patient.contact}</td>
                            <td>{patient.pathology}</td>
                            <td>{patient.medication} ({patient.dosage})</td>
                            {/* Add more data cells as needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PatientList;
