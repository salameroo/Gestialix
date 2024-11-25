import React, { useState, useEffect } from 'react';
import { Check, X, Search, Calendar, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import Spinner from '@/Components/ui/Spinner';
import DataSelector from '../Date/Picker';

export default function Asistencia() {
    const [attendanceData, setAttendanceData] = useState([]);
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [currentDay, setCurrentDay] = useState(new Date().toISOString().split('T')[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoading(true);
                const classResponse = await fetch('/api/classes');
                if (!classResponse.ok) throw new Error('Error fetching classes');
                const classData = await classResponse.json();
                setClasses(classData);
                setSelectedClass(classData[0]?.id || null);

                if (classData[0]?.id) {
                    await fetchAttendanceData(currentDay, classData[0]?.id);
                }
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    const fetchAttendanceData = async (date, classId) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/attendance-or-create?date=${date}&class_id=${classId}`);
            if (!response.ok) throw new Error('Error fetching attendance data');
            const data = await response.json();

            console.log("Data de atendancia: " + data);
            // Establece el estado por defecto como "asiste"
            const updatedData = data.map((record) => ({
                ...record,
                asiste: record.asiste !== null ? record.asiste : 1,
            }));

            setAttendanceData(updatedData);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    const handleAttendanceChange = async (attendanceId, newStatus) => {
        try {
            const response = await fetch(`/api/attendance/${attendanceId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ asiste: newStatus }),
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            // Actualiza el estado local sin re-renderizar
            setAttendanceData((prevData) =>
                prevData.map((record) =>
                    record.id === attendanceId
                        ? { ...record, asiste: newStatus }
                        : record
                )
            );
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    const handleClassChange = async (classId) => {
        setSelectedClass(classId);
        await fetchAttendanceData(currentDay, classId);
    };

    const handleDayChange = async (newDate) => {
        setCurrentDay(newDate);
        if (!selectedClass) {
            console.warn("Selecciona una clase primero.");
            return;
        }
        await fetchAttendanceData(newDate, selectedClass);
    };

    const filteredStudents = attendanceData.filter(
        (record) =>
            record.estudiante.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.estudiante.apellidos.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    const changeDate = (days) => {
        let newDate = new Date(currentDay);
        do {
            newDate.setDate(newDate.getDate() + days);
        } while (newDate.getDay() === 0 || newDate.getDay() === 6); // 0 = Domingo, 6 = Sábado

        handleDayChange(newDate.toISOString().split('T')[0]);
    };

    const truncateText = (text, maxLength) => {
        if (!text) return '';
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };


    if (loading) return (
        <Spinner
            color="green"
            size="lg"
        />
    );

    if (error) return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline"> {error}</span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-2">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-200">
                    Asistencia al Comedor
                </h1>

                {/* Controles */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0">
                        {/* Selección de Clase */}
                        <div className="flex items-center space-x-4">
                            <Users className="text-blue-500 dark:text-blue-400" />
                            <select
                                value={selectedClass || ''}
                                onChange={(e) => handleClassChange(e.target.value)}
                                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            >
                                <option value="" disabled>Selecciona una clase</option>
                                {classes.map((cls) => (
                                    <option key={cls.id} value={cls.id}>{cls.nombre}</option>
                                ))}
                            </select>
                        </div>

                        {/* Fecha */}
                        <DataSelector
                            currentDay={currentDay}
                            changeDate={changeDate}
                            handleDayChange={handleDayChange}
                        />

                        {/* <div className="flex items-center space-x-4">
                            <button onClick={() => changeDate(-1)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                                <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                            </button>
                            <div className="flex items-center space-x-2">
                                <Calendar className="text-blue-500 dark:text-blue-400" />
                                <span className="font-medium text-gray-800 dark:text-gray-200">{formatDate(currentDay)}</span>
                            </div>
                            <button onClick={() => changeDate(1)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                                <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                            </button>
                        </div> */}

                        {/* Búsqueda */}
                        <div className="relative w-full md:w-auto">
                            <input
                                type="text"
                                placeholder="Buscar estudiante..."
                                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 w-full"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" />
                        </div>
                    </div>

                    {/* Tabla de Asistencia */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Alumno
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Asistencia
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredStudents.map((record) => (
                                    <tr key={record.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-800 dark:text-gray-200">
                                            <span className="block sm:hidden">
                                                {truncateText(`${record.estudiante.nombre} ${record.estudiante.apellidos}`, 16)}
                                            </span>
                                            <span className="hidden sm:block">
                                                {truncateText(`${record.estudiante.nombre} ${record.estudiante.apellidos}`, 40)}
                                            </span>
                                        </td>
                                        {/* <td className="px-6 py-4 whitespace-nowrap text-gray-800 dark:text-gray-200">
                                            {record.estudiante.apellidos}
                                        </td> */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleAttendanceChange(record.id, 1)}
                                                    className={`p-2 rounded-full transition-colors ${record.asiste === 1
                                                        ? 'bg-green-500 text-white'
                                                        : 'bg-gray-200 hover:bg-green-100 dark:bg-gray-700 dark:hover:bg-green-600'
                                                        }`}
                                                >
                                                    <Check className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleAttendanceChange(record.id, 0)}
                                                    className={`p-2 rounded-full transition-colors ${record.asiste === 0
                                                        ? 'bg-red-500 text-white'
                                                        : 'bg-gray-200 hover:bg-red-100 dark:bg-gray-700 dark:hover:bg-red-600'
                                                        }`}
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Resumen de Asistencia */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                        Resumen de Asistencia
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-green-100 dark:bg-green-800 p-4 rounded-lg">
                            <p className="text-green-800 dark:text-green-300 font-medium">Presentes</p>
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {attendanceData.filter((record) => record.asiste === 1).length}
                            </p>
                        </div>
                        <div className="bg-red-100 dark:bg-red-800 p-4 rounded-lg">
                            <p className="text-red-800 dark:text-red-300 font-medium">Ausentes</p>
                            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                                {attendanceData.filter((record) => record.asiste === 0).length}
                            </p>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                            <p className="text-gray-800 dark:text-gray-300 font-medium">Sin marcar</p>
                            <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                                {attendanceData.filter((record) => record.asiste === null).length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}