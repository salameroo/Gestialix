
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox } from '@mui/material';

export default function OccasionalStudents({ occasionalStudents, closeModal, addStudents }) {
    const [selectedOccasionals, setSelectedOccasionals] = useState([]);

    // Manejar selección de estudiantes
    const handleToggleStudentSelection = (studentId) => {
        setSelectedOccasionals((prev) =>
            prev.includes(studentId)
                ? prev.filter((id) => id !== studentId)
                : [...prev, studentId]
        );
    };

    // Guardar selección
    const handleSaveOccasionalStudents = () => {
        const selectedStudents = occasionalStudents.filter((student) =>
            selectedOccasionals.includes(student.id)
        );
        addStudents(selectedStudents); // Agregar estudiantes seleccionados al padre
        closeModal();
    };

    return (
        <Dialog open={true} fullWidth maxWidth="sm">
            <DialogTitle>Estudiantes no asignados al comedor</DialogTitle>
            <DialogContent>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {occasionalStudents.map((student) => (
                        <li key={student.id} className="py-2 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Checkbox
                                    checked={selectedOccasionals.includes(student.id)}
                                    onChange={() => handleToggleStudentSelection(student.id)}
                                />
                                <span>{student.nombre} {student.apellidos}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </DialogContent>
            <DialogActions>
                <Button className='dark:bg-red-400 dark:hover:bg-red-500 dark:text-white' onClick={closeModal} color="error" variant="outlined">
                    Cancelar
                </Button>
                <Button
                    onClick={handleSaveOccasionalStudents}
                    color="primary"
                    variant="contained"
                    className='dark:bg-blue-400 dark:hover:bg-blue-500 dark:text-white'
                >
                    Guardar
                </Button>

            </DialogActions>
        </Dialog>
    );
}
