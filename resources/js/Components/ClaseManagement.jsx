// ComedorManagement.js
import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import ClassItem from './ui/Clases/ClassItem';
import AddEditClassModal from './ui/Clases/AddEditClassModal';

export default function ClaseManagement() {
    const [classes, setClasses] = useState([]);
    const [openClassId, setOpenClassId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddingClass, setIsAddingClass] = useState(false);
    const [editingClass, setEditingClass] = useState(null);

    useEffect(() => {
        fetch('/api/classes')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched classes:', data);
                setClasses(data);
            })
            .catch(error => console.error('Error fetching classes:', error));
    }, []);

    const handleToggleClass = (classId) => {
        setOpenClassId(openClassId === classId ? null : classId);
    };

    const handleAddClass = (classData) => {
        console.log('Adding class:', classData);

        fetch('/api/classes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: classData.name,  // Asegúrate de usar el nombre correcto en el backend
                curso_academico: classData.academicYear,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(newClass => {
                setClasses([...classes, newClass]);
                setIsAddingClass(false);
            })
            .catch(error => console.error('Error adding class:', error));
    };

    const handleEditClass = (updatedClass) => {
        setClasses(classes.map(cls => (cls.id === updatedClass.id ? updatedClass : cls)));
        setEditingClass(null);
    };


    const handleDeleteClass = (classId) => {
        fetch(`/api/classes/${classId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setClasses(classes.filter(cls => cls.id !== classId));
            })
            .catch(error => console.error('Error deleting class:', error));

    };


    const filteredClasses = classes.filter(
        cls =>
            cls.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cls.estudiantes?.some(estudiante => estudiante.nombre?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Gestión de Comedor - Clases y Alumnos</h1>
                <div className="mb-6 flex justify-between items-center">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar clases o alumnos..."
                            className="pl-10 pr-4 py-2 border rounded-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    </div>
                    <button onClick={() => setIsAddingClass(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
                        <Plus className="w-5 h-5 mr-2" /> Añadir Clase
                    </button>
                </div>
                {filteredClasses.length > 0 ? (
                    filteredClasses.map(classData => (
                        <ClassItem
                            key={classData.id}
                            classData={classData}
                            isOpen={openClassId === classData.id}
                            onToggle={() => handleToggleClass(classData.id)}
                            onEdit={setEditingClass}
                            onDelete={handleDeleteClass}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500">No hay clases disponibles</p>
                )}
                {isAddingClass && <AddEditClassModal onSave={handleAddClass} onClose={() => setIsAddingClass(false)} />}
                {editingClass && (
                    <AddEditClassModal
                        classData={editingClass}
                        onSave={handleEditClass}
                        onClose={() => setEditingClass(null)}
                    />
                )}
            </div>
        </div>
    );
}
