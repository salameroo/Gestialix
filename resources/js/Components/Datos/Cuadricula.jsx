'use client'

import React, { useState, useEffect } from 'react';
import { Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

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
                            {clase.nombre} {/* Renderiza solo el nombre */}
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
                    /* Aquí renderizas la tabla */

                    <TableContainer component={Paper} className="mt-4">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Alumno</TableCell>
                                    {[...Array(diasEnMes)].map((_, dia) => (
                                        <TableCell key={dia} align="center">{dia + 1}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {alumnos.length > 0 ? (
                                    alumnos.map((alumno) => (
                                        <TableRow key={alumno.id}>
                                            <TableCell component="th" scope="row">{alumno.nombre}</TableCell>
                                            {alumno.diasComedor.map((asistio, dia) => (
                                                <TableCell
                                                    key={dia}
                                                    align="center"
                                                    className={`w-8 h-8 text-white font-bold 
                                    ${asistio === true ? 'bg-green-500' :
                                                            asistio === false ? 'bg-red-500' :
                                                                'bg-purple-500'}`}
                                                >
                                                    {asistio === true ? '✓' : asistio === false ? '✗' : '?'}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={diasEnMes + 1} align="center">
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

