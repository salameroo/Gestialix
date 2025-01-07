import React, { useState, useReducer, useEffect, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import StudentList from './components/Clase';
import AddEditClassModal from './components/AddEditClassModal';
import AddStudentModal from './components/AddStudentModal';
import csrfFetch from '@/utils/csrfFetch';
import classesReducer from './reducers/classesReducer';
import TituloPagina from '../TitlePage';
import {
    Box,
    Paper,
    Typography,
    Grid,
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Container,
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import ToastManager from '../ToastManager';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export default function ClaseManagement() {
    const toastRef = useRef();
    const [classes, dispatch] = useReducer(classesReducer, []);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingClass, setEditingClass] = useState(null);
    const [orderBy, setOrderBy] = useState('nombre'); // Nombre por defecto
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
    const [selectedClassId, setSelectedClassId] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [open, setOpen] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');
    const [pendingAssignment, setPendingAssignment] = useState(null);


    const showToast = (message, severity) => {
        toastRef.current.showToast(message, severity);
    };
    // Escucha para detectar cambios en el tamaño de pantalla
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Cargar las clases desde el backend
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await csrfFetch('/api/classes');
                const data = await response.json();
                dispatch({ type: 'SET_CLASSES', payload: data });
            } catch (error) {
                showToast('Error al cargar las clases:', 'error');
                console.error('Error al cargar las clases:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchClasses();
    }, []);

    const handleDeleteStudent = async (classId, studentId) => {
        console.log('Estudiante a eliminar:', studentId);
        try {
            await csrfFetch(`/api/classes/${classId}/students/${studentId}`, {
                method: 'DELETE',
            });
            dispatch({
                type: 'DELETE_STUDENT',
                payload: { classId, studentId },
            });
        } catch (error) {
            console.error('Error al eliminar el estudiante:', error);
        }
    };

    const onOpenStudentModal = (classId) => {
        setSelectedClassId(classId);
        setIsStudentModalOpen(true);
    };

    // Manejar la creación/edición de clases
    const handleSaveClass = async (clase) => {
        try {
            // console.log("clase", clase)
            const method = editingClass ? 'PUT' : 'POST';
            const endpoint = editingClass ? `/api/classes/${clase.id}` : '/api/classes/new';
            console.log('endpoint', endpoint, "clase", clase, "method", method);
            const response = await csrfFetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(clase),
            });

            const updatedClass = await response.json();
            dispatch({
                type: editingClass ? 'UPDATE_CLASS' : 'ADD_CLASS',
                payload: updatedClass,
            });

            setIsModalOpen(false);
            setEditingClass(null);
        } catch (error) {
            console.error('Error al guardar la clase:', error);
        }
    };

    // Manejar la eliminación de una clase
    const handleDeleteClass = async (classId) => {
        try {
            await csrfFetch(`/api/classes/${classId}`, { method: 'DELETE' });
            dispatch({ type: 'DELETE_CLASS', payload: classId });
        } catch (error) {
            console.error('Error al eliminar la clase:', error);
        }
    };

    // Manejar el guardado de estudiantes
    const handleSaveStudent = async (studentData) => {
        try {
            console.log('Datos enviados al servidor:', studentData);
            const response = await csrfFetch('/api/students', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData),
            });

            const data = await response.json();
            console.log('Respuesta del servidor:', data);

            // Extraer el estudiante de la respuesta
            const student = data.student;

            if (!student) {
                console.error('No se encontró el estudiante en la respuesta del servidor.');
                return;
            }

            console.log('Estudiante recibido:', student);

            // Disparar la acción para añadir el estudiante al estado
            dispatch({
                type: 'ADD_STUDENT',
                payload: {
                    classId: studentData.clase_id,
                    student: student,
                },
            });

            console.log('Dispatch ADD_STUDENT ejecutado:', {
                classId: studentData.clase_id,
                student: student,
            });
        } catch (error) {
            console.error('Error al guardar el estudiante:', error);
            alert('No se pudo guardar el estudiante.');
        }
    };




    // Alternar la asignación de un estudiante
    // const toggleAssignment = async (classId, studentId) => {
    //     try {
    //         const response = await csrfFetch(`/api/students/${studentId}/toggle-assignment`, {
    //             method: 'PATCH',
    //         });

    //         if (response.status === 200) {
    //             const { asignado } = await response.json();
    //             dispatch({
    //                 type: 'TOGGLE_ASSIGNMENT',
    //                 payload: { classId, studentId, asignado },
    //             });
    //         }
    //     } catch (error) {
    //         console.error('Error al alternar el estado de asignación:', error);
    //         alert('No se pudo alternar el estado de asignación.');
    //     }
    // };

    const toggleAssignment = async (classId, studentId, forzar = false) => {
        try {
            const response = await csrfFetch(`/api/students/${studentId}/toggle-assignment`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ forzar }),
            });

            const data = await response.json();

            if (response.ok) {
                return data; // Devuelve la respuesta al hijo para manejar advertencias
            } else {
                throw new Error(data.error || 'Error al alternar la asignación');
            }
        } catch (error) {
            console.error('Error al alternar la asignación:', error);
            throw error;
        }
    };




    const handleOpenStudentModal = (classId) => {
        // console.log('ID de la clase recibido en el padre:', classId);
        setSelectedClassId(classId);
        setIsStudentModalOpen(true);
    };

    const handleEditStudent = async (classId, editedStudent) => {
        try {
            // console.log("Estudiante editado:", editedStudent, "Estudiante id:", editedStudent.studentId);
            const response = await csrfFetch(`/api/students/${editedStudent.studentId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editedStudent),
            });

            if (!response.ok) {
                throw new Error('Error en la actualización.');
            }

            const updatedStudent = await response.json();
            dispatch({ type: 'UPDATE_STUDENT', payload: updatedStudent });
        } catch (error) {
            console.error('Error al actualizar el estudiante:', error);
        }
    };

    const processedClasses = classes
        .filter((cls) => {
            // Filtrar por el término de búsqueda en el nombre de la clase
            return cls.name.toLowerCase().includes(searchTerm.toLowerCase());
        })
        .map((cls) => {
            // Ordenar los estudiantes dentro de cada clase
            const sortedEstudiantes = [...(cls.estudiantes || [])].sort((a, b) => {
                if (orderBy === 'name') {
                    return (a.name || '').localeCompare(b.name || '');
                } else if (orderBy === 'apellidos') {
                    return (a.surname || '').localeCompare(b.surname || '');
                } else if (orderBy === 'asignado') {
                    return (a.assigned_lunch ? 1 : 0) - (b.assigned_lunch ? 1 : 0);
                }
                return 0;
            });

            // Devolver la clase con los estudiantes ordenados
            return { ...cls, estudiantes: sortedEstudiantes };
        });

    return (
        <Container maxWidth="xl" className="h-full mb-8 mt-0">
            <ToastManager ref={toastRef} />
            <Box sx={{ py: 4 }}>
                <Paper
                    elevation={3}
                    sx={{
                        p: { xs: 2, sm: 4 },
                        backgroundColor: 'background.default', // Usa tokens de color del tema
                        borderRadius: 2,
                    }}
                >
                    <div className='mb-4'>
                        <TituloPagina titulo={'Gestión de Clases'} borderColor='indigo'></TituloPagina>
                    </div><br />
                    {/* Gestión de Clases */}
                    <Grid container spacing={3} alignItems="stretch">
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                placeholder="Buscar clases..."
                                variant="outlined"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="order-by-label">Ordenar por</InputLabel>
                                <Select
                                    labelId="order-by-label"
                                    value={orderBy}
                                    onChange={(e) => setOrderBy(e.target.value)}
                                    label="Ordenar por"
                                >
                                    <MenuItem value="nombre">Nombre</MenuItem>
                                    <MenuItem value="apellidos">Apellido</MenuItem>
                                    <MenuItem value="asignado">Estado de Asignación</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                onClick={() => {
                                    setEditingClass(null);
                                    setIsModalOpen(true);
                                }}
                                sx={{
                                    height: '100%',
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                }}
                            >
                                {isMobile ? 'Añadir' : 'Añadir Clase'}
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>

            <Grid container spacing={3}>
                {processedClasses.map((clase) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} key={clase.id}>
                            <StudentList
                                key={clase.id}
                                clase={clase}
                                estudiantes={clase.estudiantes || []}
                                onToggleAssignment={toggleAssignment}
                                onEditClass={(clase) => {
                                    setEditingClass(clase);
                                    setIsModalOpen(true);
                                }}
                                onDeleteClass={(clase) => {
                                    handleDeleteClass(clase.id);
                                }}
                                onDeleteStudent={(claseId, studentId) => {
                                    handleDeleteStudent(clase.id, studentId);
                                }}
                                dispatch={dispatch}
                                onOpenStudentModal={handleOpenStudentModal}
                            />

                        </Grid>
                    );
                })}
            </Grid>
            <AddEditClassModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveClass}
                editingClass={editingClass || false} // Pasar los datos completos de la clase
            />
            <AddStudentModal
                open={isStudentModalOpen}
                onClose={() => setIsStudentModalOpen(false)}
                onSave={handleSaveStudent}
                classId={selectedClassId}
                studentData={selectedStudent} // Proporciona este prop si estás editando
            // open={isStudentModalOpen}
            // onClose={() => setIsStudentModalOpen(false)}
            // onSave={handleSaveStudent}
            // classId={selectedClassId}
            />

        </Container>
    );
}
