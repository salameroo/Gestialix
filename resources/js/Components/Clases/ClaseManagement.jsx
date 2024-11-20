import React, { useState, useEffect, useReducer } from 'react';
import { Plus, Search } from 'lucide-react';
import ClassItem from './components/ClassItem';
import AddEditClassModal from './components/AddEditClassModal';
import EditStudentModal from './components/EditStudentModal';

// Reducer para manejar el estado de las clases
const classesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CLASSES':
            return action.payload;
        case 'ADD_CLASS':
            return [...state, action.payload];
        case 'UPDATE_CLASS':
            return state.map((cls) =>
                cls.id === action.payload.id ? action.payload : cls
            );
        case 'DELETE_CLASS':
            return state.filter((cls) => cls.id !== action.payload);
        case 'UPDATE_STUDENTS':
            return state.map((cls) =>
                cls.id === action.payload.classId
                    ? { ...cls, estudiantes: action.payload.students }
                    : cls
            );
        case 'TOGGLE_ASSIGNMENT':
            return state.map((cls) =>
                cls.id === action.payload.classId
                    ? {
                        ...cls,
                        estudiantes: cls.estudiantes.map((student) =>
                            student.id === action.payload.studentId
                                ? {
                                    ...student,
                                    asignado: !student.asignado,
                                    loading: action.payload.loading || false,
                                }
                                : student
                        ),
                    }
                    : cls
            );
        case 'UPDATE_STUDENT':
            return state.map((cls) =>
                cls.id === action.payload.classId
                    ? {
                        ...cls,
                        estudiantes: cls.estudiantes.map((student) =>
                            student.id === action.payload.updatedStudent.id
                                ? action.payload.updatedStudent
                                : student
                        ),
                    }
                    : cls
            );

        default:
            return state;
    }
};

export default function ClaseManagement() {
    const [classes, dispatch] = useReducer(classesReducer, []);
    const [openClassId, setOpenClassId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddingClass, setIsAddingClass] = useState(false);
    const [editingClass, setEditingClass] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    // Manejo de errores
    const handleError = (message) => {
        setError(message);
        setTimeout(() => setError(null), 5000);
    };

    // Cargar clases al montar el componente
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await fetch('/api/classes');
                if (!response.ok) throw new Error(`Error al obtener clases: ${response.statusText}`);
                const data = await response.json();
                dispatch({ type: 'SET_CLASSES', payload: data });
            } catch (error) {
                handleError('No se pudieron cargar las clases');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchClasses();
    }, []);

    // Alternar clase abierta
    const handleToggleClass = (classId) => {
        setOpenClassId(openClassId === classId ? null : classId);
    };

    // Añadir clase
    const handleAddClass = async (classData) => {
        try {
            const response = await fetch('/api/classes/new', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: classData.name,
                    curso_academico: classData.academicYear,
                }),
            });
            if (!response.ok) throw new Error('Error al añadir la clase');
            const newClass = await response.json();
            dispatch({ type: 'ADD_CLASS', payload: newClass });
            setIsAddingClass(false);
        } catch (error) {
            handleError('No se pudo añadir la clase');
            console.error(error);
        }
    };

    // Editar clase
    const handleEditClass = async (updatedClass) => {
        try {
            const response = await fetch(`/api/classes/${updatedClass.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedClass),
            });
            if (!response.ok) throw new Error('Error al editar la clase');
            dispatch({ type: 'UPDATE_CLASS', payload: updatedClass });
            setEditingClass(null);
            setIsEditModalOpen(false);
        } catch (error) {
            handleError('No se pudo editar la clase');
            console.error(error);
        }
    };

    // Eliminar clase
    const handleDeleteClass = async (classId) => {
        try {
            const response = await fetch(`/api/classes/${classId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Error al eliminar la clase');
            dispatch({ type: 'DELETE_CLASS', payload: classId });
        } catch (error) {
            handleError('No se pudo eliminar la clase');
            console.error(error);
        }
    };

    // Actualizar estudiantes
    // const handleDeleteStudent = async (classId, updatedStudents) => {
    //     try {
    //         const response = await fetch(`/api/classes/${classId}/students/${Student.id}`, {
    //             method: 'DELETE',
    //         });
    //         if (!response.ok) throw new Error('Error al eliminar la clase');
    //         dispatch({ type: 'DELETE_CLASS', payload: classId });
    //     } catch (error) {
    //         handleError('No se pudo eliminar la clase');
    //         console.error(error);
    //     }
    //     dispatch({
    //         type: 'UPDATE_STUDENTS',
    //         payload: { classId, students: updatedStudents },
    //     });
    // };

    

    const toggleAssignment = async (classId, studentId) => {
        // Actualizar el estado local mientras se realiza la llamada al backend
        dispatch({
            type: 'TOGGLE_ASSIGNMENT',
            payload: { classId, studentId, loading: true }, // Muestra "Cargando..."
        });

        try {
            const response = await fetch(`/api/students/${studentId}/toggle-assignment`, {
                method: 'PATCH',
            });

            if (!response.ok) throw new Error('Error al guardar el cambio en el backend');

            const updatedStudent = await response.json(); // El backend devuelve el estudiante actualizado

            // Actualizar el estado local con los datos del backend
            dispatch({
                type: 'UPDATE_STUDENT',
                payload: { classId, updatedStudent },
            });
        } catch (error) {
            console.error('Error al asignar/desasignar en el backend:', error);

            // Revertir cambios locales en caso de error
            dispatch({
                type: 'TOGGLE_ASSIGNMENT',
                payload: { classId, studentId, loading: false }, // Revertir estado de "Cargando..."
            });
        }
    };

    // Filtrar clases
    const filteredClasses = classes.filter(
        (cls) =>
            cls.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cls.estudiantes?.some((estudiante) =>
                estudiante.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
            )
    );

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Gestión de Clases</h1>
                {error && <div className="bg-red-500 text-white p-2 rounded">{error}</div>}
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
                    <button
                        onClick={() => setIsAddingClass(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
                    >
                        <Plus className="w-5 h-5" />
                        <span className="hidden sm:inline ml-2">Añadir Clase</span>
                    </button>

                </div>
                {loading ? (
                    <p className="text-center text-gray-500">Cargando clases...</p>
                ) : filteredClasses.length > 0 ? (
                    filteredClasses.map((classData) => (
                        <ClassItem
                            key={classData.id}
                            classData={classData}
                            isOpen={openClassId === classData.id}
                            onToggle={() => handleToggleClass(classData.id)}
                            onEdit={(classData) => {
                                setEditingClass(classData);
                                setIsEditModalOpen(true);
                            }}
                            onDelete={handleDeleteClass}
                            toggleAssignment={(studentId) => toggleAssignment(classData.id, studentId)}
                        // toggleAssignment={(studentId) => handleToggleAssignment(classData.id, studentId)}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500">No hay clases disponibles</p>
                )}
                {isAddingClass && (
                    <AddEditClassModal
                        onSave={handleAddClass}
                        onClose={() => setIsAddingClass(false)}
                    />
                )}
                {isEditModalOpen && editingClass && (
                    <EditStudentModal
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        onSave={handleStudentsUpdate}
                        title="Editar Clase"
                        initialData={editingClass}
                        fields={[
                            {
                                name: 'nombre',
                                label: 'Nombre de la Clase',
                                type: 'text',
                                required: true,
                            },
                            {
                                name: 'curso_academico',
                                label: 'Año Académico',
                                type: 'text',
                                required: true,
                            },
                        ]}
                    />
                )}
            </div>
        </div>
    );
}
