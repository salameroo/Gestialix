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
import TituloPagina from '../TitlePage';

// Funciones para peticiones al backend
const obtenerClases = async () => {
    const response = await fetch('/api/info/clasees');
    const data = await response.json();
    return data.map(({ id, name }) => ({ id, name })); // Filtra solo lo necesario
};

const obtenerAlumnos = async (claseId, mes, anio) => {
    const response = await fetch(`/api/info/alumnos?class_id=${claseId}&month=${mes}&year=${anio}`);
    if (!response.ok) throw new Error('Error al obtener alumnos');
    return await response.json();
};


export default function Cuadricula() {
    const [claseSeleccionada, setClaseSeleccionada] = useState('');
    const [mesSeleccionado, setMesSeleccionado] = useState(new Date().getMonth());
    const [clases, setClases] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [anioSeleccionado, setAnioSeleccionado] = useState(new Date().getFullYear());


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
                const response = await obtenerAlumnos(claseSeleccionada, mesSeleccionado + 1, anioSeleccionado);

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
    }, [claseSeleccionada, mesSeleccionado, anioSeleccionado]);


    const diasEnMes = new Date(new Date().getFullYear(), mesSeleccionado + 1, 0).getDate();

    return (
        <div className="container mx-auto ">
            <TituloPagina titulo={'Cuadricula de Alumnos'} darkBorderColor=''></TituloPagina>
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-4">
                <Select
                    value={claseSeleccionada}
                    onChange={(e) => setClaseSeleccionada(e.target.value)}
                    className="bg-white dark:bg-gray-700 w-full md:w-auto"
                >
                    {clases.map((clase) => (
                        <MenuItem key={clase.id} value={clase.id}>
                            {clase.name}
                        </MenuItem>
                    ))}
                </Select>

                <Select
                    value={mesSeleccionado}
                    onChange={(e) => setMesSeleccionado(e.target.value)}
                    className="bg-white dark:bg-gray-700 w-full md:w-auto"
                >
                    {[...Array(12)].map((_, i) => (
                        <MenuItem key={i} value={i}>
                            {new Date(0, i).toLocaleString('default', { month: 'long' })}
                        </MenuItem>
                    ))}
                </Select>

                <Select
                    value={anioSeleccionado}
                    onChange={(e) => setAnioSeleccionado(e.target.value)}
                    className="bg-white dark:bg-gray-700 w-full md:w-auto"
                >
                    {[...Array(10)].map((_, i) => {
                        const year = new Date().getFullYear() - 5 + i; // 5 años atrás y 5 años adelante
                        return (
                            <MenuItem key={year} value={year}>
                                {year}
                            </MenuItem>
                        );
                    })}
                </Select>

            </div>

            <div>
                {mensaje ? (
                    <div className="text-center text-gray-500">{mensaje}</div>
                ) : (
                    <div className="mt-4">
                        {/* Aseguramos que solo este div permita el desplazamiento */}
                        <TableContainer
                            component={Paper}
                            className="shadow-md rounded-lg overflow-x-auto max-w-full"
                        >
                            <Table className="border-collapse border border-gray-200 dark:border-gray-700 w-full min-w-max">
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
                                                    className="text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 px-4 md:px-12"
                                                >
                                                    {alumno.name}
                                                </TableCell>
                                                {alumno.mealDays.map((diaData, dia) => (
                                                    <TableCell
                                                        key={dia}
                                                        align="center"
                                                        className={`w-8 h-8 text-sm md:font-bold md:text-base border border-gray-200 dark:border-gray-700
                                                    ${diaData === '✓'
                                                                ? 'bg-lime-700 hover:bg-lime-950 dark:bg-lime-500 hover:text-white dark:hover:bg-lime-600'
                                                                : diaData === '✗'
                                                                    ? 'bg-red-600 hover:bg-red-950 dark:bg-red-400 hover:text-white dark:hover:bg-red-500'
                                                                    : diaData === 'O'
                                                                        ? 'bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500'
                                                                        : 'bg-sky-100 hover:bg-sky-600 dark:bg-neutral-400 dark:text-sky-700 dark:hover:text-white hover:text-white dark:hover:bg-sky-500'
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
                    </div>
                )}
            </div>
        </div>
    );
}
