'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, Select, MenuItem } from '@mui/material';
import { Check, X, HelpCircle } from 'lucide-react';

// Funciones vacías para peticiones al backend
const obtenerClases = async () => {
    const response = await fetch('/api/info/clasees');
    const data = await response.json();
    return data.map(({ id, nombre }) => ({ id, nombre })); // Filtra solo lo necesario
};

const obtenerAlumnos = async (claseId, mes) => {
    const response = await fetch(`/api/info/alumnos?clase_id=${claseId}&mes=${mes}`);
    if (!response.ok) throw new Error('Error al obtener alumnos');
    return await response.json();
};

export default function ComedorEscolar() {
    const [claseSeleccionada, setClaseSeleccionada] = useState('');
    const [mesSeleccionado, setMesSeleccionado] = useState(new Date().getMonth());
    const [clases, setClases] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        const cargarClases = async () => {
            const clasesDisponibles = await obtenerClases();
            setClases(clasesDisponibles);
            if (clasesDisponibles.length > 0) {
                setClaseSeleccionada(clasesDisponibles[0].id);
            }
        };
        cargarClases();
    }, []);

    useEffect(() => {
        const cargarAlumnos = async () => {
            if (claseSeleccionada) {
                const response = await obtenerAlumnos(claseSeleccionada, mesSeleccionado + 1);

                if (response.message) {
                    setAlumnos([]);
                    setMensaje(response.message);
                } else {
                    setAlumnos(response);
                    setMensaje('');
                }
            }
        };
        cargarAlumnos();
    }, [claseSeleccionada, mesSeleccionado]);

    const diasEnMes = new Date(new Date().getFullYear(), mesSeleccionado + 1, 0).getDate();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">Registro de Comedor Escolar</h1>
            <div className="flex space-x-4 mb-4">
                <Select
                    value={claseSeleccionada}
                    onChange={(e) => setClaseSeleccionada(e.target.value)}
                    className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                    {clases.map((clase) => (
                        <MenuItem key={clase.id} value={clase.id}>
                            {clase.nombre}
                        </MenuItem>
                    ))}
                </Select>

                <Select
                    value={mesSeleccionado}
                    onChange={(e) => setMesSeleccionado(e.target.value)}
                    className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                    {[...Array(12)].map((_, i) => (
                        <MenuItem key={i} value={i}>
                            {new Date(0, i).toLocaleString('default', { month: 'long' })}
                        </MenuItem>
                    ))}
                </Select>
            </div>
            <Card className="mt-4 shadow-lg rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800">
                <CardContent className="p-0">
                    {mensaje ? (
                        <div className="text-center text-gray-500 p-4">{mensaje}</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-blue-100 dark:bg-blue-900">
                                        <th className="sticky left-0 z-10 bg-blue-100 dark:bg-blue-900 font-bold text-gray-900 dark:text-gray-100 p-3 text-left">
                                            Alumno
                                        </th>
                                        {[...Array(diasEnMes)].map((_, dia) => (
                                            <th key={dia} className="font-bold text-gray-900 dark:text-gray-100 p-3 text-center">
                                                {dia + 1}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {alumnos.length > 0 ? (
                                        alumnos.map((alumno, index) => (
                                            <tr key={alumno.id} className={`${index % 2 === 0 ? 'bg-blue-50 dark:bg-blue-800' : 'bg-white dark:bg-gray-700'} hover:bg-blue-100 dark:hover:bg-blue-700`}>
                                                <td className="sticky left-0 z-10 bg-inherit text-gray-900 dark:text-gray-100 p-3 font-medium border-b border-gray-200 dark:border-gray-600">
                                                    {alumno.nombre}
                                                </td>
                                                {alumno.diasComedor.map((asistio, dia) => (
                                                    <td key={dia} className="p-3 text-center border-b border-gray-200 dark:border-gray-600">
                                                        <div className={`flex items-center justify-center
                                                            ${asistio === true
                                                                ? 'text-green-600 dark:text-green-400'
                                                                : asistio === false
                                                                    ? 'text-red-600 dark:text-red-400'
                                                                    : 'text-blue-600 dark:text-blue-400'
                                                            }`}
                                                        >
                                                            {asistio === true ? (
                                                                <Check className="h-5 w-5" />
                                                            ) : asistio === false ? (
                                                                <X className="h-5 w-5" />
                                                            ) : (
                                                                <HelpCircle className="h-5 w-5" />
                                                            )}
                                                        </div>
                                                    </td>
                                                ))}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={diasEnMes + 1} className="text-center p-4 text-gray-500 dark:text-gray-400">
                                                No hay datos disponibles
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}






<TableBody>
    {alumnos.length > 0 ? (
        alumnos.map((alumno) => (
            <TableRow
                key={alumno.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800"
            >
                {/* Nombre del Alumno */}
                <TableCell
                    component="th"
                    scope="row"
                    className="text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700"
                >
                    {alumno.nombre}
                </TableCell>
                {/* Días de Asistencia */}
                
                {alumno.diasComedor &&
                    alumno.diasComedor.map((asistio, dia) => (
                        <TableCell
                            key={dia}
                            align="center"
                            className={`w-8 h-8 font-bold text-white border border-gray-200 dark:border-gray-700
                                ${asistio === true
                                    ? 'bg-lime-700 hover:bg-lime-800 dark:bg-lime-500 dark:hover:bg-lime-600'
                                    : asistio === false
                                        ? 'bg-red-600 hover:bg-red-700 dark:bg-red-400 dark:hover:bg-red-500'
                                        : 'bg-sky-100 hover:bg-sky-300 dark:bg-neutral-400 dark:text-sky-700 dark:hover:text-sky-600'
                                }`}
                        >
                            {asistio === true ? '✓' : asistio === false ? '✗' : '◯'}
                        </TableCell>
                    ))}
            </TableRow>
        ))
    ) : (
        <TableRow>
            <TableCell
                colSpan={diasEnMes + 1}
                align="center"
                className="text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
            >
                No hay datos disponibles
            </TableCell>
        </TableRow>
    )}
</TableBody>





'use client';

import React, { useState, useEffect } from 'react';
import {
    Select,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { Circle } from 'lucide-react';

// Funciones para peticiones al backend
const obtenerClases = async () => {
    const response = await fetch('/api/info/clasees');
    const data = await response.json();
    return data.map(({ id, nombre }) => ({ id, nombre })); // Filtra solo lo necesario
};

const obtenerAlumnos = async (claseId, mes) => {
    const response = await fetch(`/api/info/alumnos?clase_id=${claseId}&mes=${mes}`);
    if (!response.ok) throw new Error('Error al obtener alumnos');
    return await response.json();
};

export default function ComedorEscolar() {
    const [claseSeleccionada, setClaseSeleccionada] = useState('');
    const [mesSeleccionado, setMesSeleccionado] = useState(new Date().getMonth());
    const [clases, setClases] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        const cargarClases = async () => {
            const clasesDisponibles = await obtenerClases();
            setClases(clasesDisponibles);
            if (clasesDisponibles.length > 0) {
                setClaseSeleccionada(clasesDisponibles[0].id); // ID como valor inicial
            }
        };
        cargarClases();
    }, []);

    useEffect(() => {
        const cargarAlumnos = async () => {
            if (claseSeleccionada) {
                const response = await obtenerAlumnos(claseSeleccionada, mesSeleccionado + 1);

                if (response.message) {
                    setAlumnos([]); // Limpia la lista de alumnos
                    setMensaje(response.message); // Mensaje del backend
                } else {
                    setAlumnos(response);
                    setMensaje(''); // Limpia el mensaje
                }
            }
        };
        cargarAlumnos();
    }, [claseSeleccionada, mesSeleccionado]);

    const diasEnMes = new Date(new Date().getFullYear(), mesSeleccionado + 1, 0).getDate();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Registro de Comedor Escolar</h1>
            <div className="flex space-x-4 mb-4">
                <Select
                    value={claseSeleccionada}
                    onChange={(e) => setClaseSeleccionada(e.target.value)}
                    className="bg-white dark:bg-gray-700"
                >
                    {clases.map((clase) => (
                        <MenuItem key={clase.id} value={clase.id}>
                            {clase.nombre}
                        </MenuItem>
                    ))}
                </Select>

                <Select
                    value={mesSeleccionado}
                    onChange={(e) => setMesSeleccionado(e.target.value)}
                    className="bg-white dark:bg-gray-700"
                >
                    {[...Array(12)].map((_, i) => (
                        <MenuItem key={i} value={i}>
                            {new Date(0, i).toLocaleString('default', { month: 'long' })}
                        </MenuItem>
                    ))}
                </Select>
            </div>
            <div>
                {mensaje ? (
                    <div className="text-center text-gray-500">{mensaje}</div>
                ) : (
                    <TableContainer component={Paper} className="mt-4 shadow-md rounded-lg">
                        <Table className="border-collapse border border-gray-200 dark:border-gray-700">
                            <TableHead>
                                <TableRow className="bg-gray-100 dark:bg-gray-800">
                                    <TableCell className="font-bold text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700">
                                        Alumno
                                    </TableCell>
                                    {[...Array(diasEnMes)].map((_, dia) => (
                                        <TableCell
                                            key={dia}
                                            align="center"
                                            className="font-bold text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700"
                                        >
                                            {dia + 1}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {alumnos.length > 0 ? (
                                    alumnos.map((alumno) => (
                                        <TableRow
                                            key={alumno.id}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-800"
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                className="text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700"
                                            >
                                                {alumno.nombre}
                                            </TableCell>
                                            {alumno.diasComedor.map((diaData, dia) => (
                                                <TableCell
                                                    key={dia}
                                                    align="center"
                                                    className={`w-8 h-8 font-bold text-white border border-gray-200 dark:border-gray-700
                                    ${diaData === '✓'
                                                            ? 'bg-lime-700 hover:bg-lime-950 dark:bg-lime-500 hover:text-white dark:hover:bg-lime-600'
                                                            : diaData === '✗'
                                                                ? 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600'
                                                                : diaData === 'O'
                                                                    ? 'bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500'
                                                                    : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-800'
                                                        }`}
                                                >
                                                    {diaData}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={diasEnMes + 1}
                                            align="center"
                                            className="text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                                        >
                                            No hay datos disponibles
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </div>
        </div>
    );
}











<TableRow
                                            key={alumno.id}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-800"
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                className="text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700"
                                            >
                                                {alumno.nombre}
                                            </TableCell>
                                            {alumno.diasComedor.map((asistio, dia) => (
                                                <TableCell
                                                    key={dia}
                                                    align="center"
                                                    className={`w-8 h-8 font-bold text-white border border-gray-200 dark:border-gray-700
                                    ${asistio === true
                                                            ? 'bg-lime-700 hover:bg-lime-950 dark:bg-lime-500 hover:text-white dark:hover:bg-lime-600'
                                                            : asistio === false
                                                                ? 'bg-red-600 hover:bg-red-950 dark:bg-red-400 hover:text-white dark:hover:bg-red-500'
                                                                : 'bg-sky-100 hover:bg-sky-600 dark:bg-neutral-400 dark:text-sky-700 dark:hover:text-white hover:text-white dark:hover:bg-sky-500'
                                                        }`}
                                                >
                                                    {asistio === true ? '✓' : asistio === false ? '✗' : '◯'}
                                                </TableCell>
                                            ))}
                                        </TableRow>