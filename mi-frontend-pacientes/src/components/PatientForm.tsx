// src/components/PatientForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from './PatientForm.module.css'; // Importar CSS Modules

// Reutiliza la interfaz User (puedes tenerla en un archivo compartido o duplicarla)
interface User {
    name: string;
    rut: string;
    address: string;
    medication: string;
    dosage: string;
    age: number | ''; // Permitir string vacío para el input number
    contact: string;
    healthFacility: string;
    pathology: string;
}

const PatientForm: React.FC = () => {
    const initialFormState: User = {
        name: '',
        rut: '',
        address: '',
        medication: '',
        dosage: '',
        age: '',
        contact: '',
        healthFacility: '',
        pathology: '',
    };

    const [patient, setPatient] = useState<User>(initialFormState);
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPatient(prev => ({
            ...prev,
            [name]: name === 'age' ? (value === '' ? '' : parseInt(value, 10)) : value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setIsLoading(true);

        if (patient.age === '') {
            setError('La edad es requerida y debe ser un número.');
            return;
        }

        try {
            // Asegúrate que la URL coincida con tu endpoint del backend
            const response = await fetch('http://localhost:3001/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...patient, age: Number(patient.age) }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(`Paciente ${patient.name} registrado exitosamente!`);
                setPatient(initialFormState); // Limpiar formulario
            } else {
                setError(data.message || 'Error al registrar el paciente.');
            }
        } catch (err) {
            console.error(err);
            setError('No se pudo conectar al servidor. Intenta más tarde.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2>Registrar Nuevo Paciente</h2>
            {message && <p className={`${styles.message} ${styles.successMessage}`}>{message}</p>}
            {error && <p className={`${styles.message} ${styles.errorMessage}`}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Nombre Completo:</label>
                    <input type="text" id="name" name="name" value={patient.name} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="rut">RUT (con guion y dígito verificador):</label>
                    <input type="text" id="rut" name="rut" value={patient.rut} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="address">Dirección:</label>
                    <input type="text" id="address" name="address" value={patient.address} onChange={handleChange} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="medication">Medicación Actual:</label>
                    <input type="text" id="medication" name="medication" value={patient.medication} onChange={handleChange} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="dosage">Dosis:</label>
                    <input type="text" id="dosage" name="dosage" value={patient.dosage} onChange={handleChange} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="age">Edad:</label>
                    <input type="number" id="age" name="age" value={patient.age} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="contact">Teléfono de Contacto:</label>
                    <input type="tel" id="contact" name="contact" value={patient.contact} onChange={handleChange} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="healthFacility">Centro de Salud Derivador:</label>
                    <input type="text" id="healthFacility" name="healthFacility" value={patient.healthFacility} onChange={handleChange} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="pathology">Patología Principal:</label>
                    <textarea id="pathology" name="pathology" value={patient.pathology} onChange={handleChange} />
                </div>
                <button type="submit" className={styles.button} disabled={isLoading}>
                    {isLoading ? 'Registrando...' : 'Registrar Paciente'}
                </button>
            </form>
        </div>
    );
};

export default PatientForm;
