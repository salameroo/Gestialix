import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Fab,
    Dialog,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import MonitoraForm from './MonitoraForm';

function MonitorasList() {
    const [monitoras, setMonitoras] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [editingMonitora, setEditingMonitora] = useState(null);

    useEffect(() => {
        fetchMonitoras();
    }, []);

    const fetchMonitoras = async () => {
        const data = await getMonitoras();
        setMonitoras(data);
    };

    const handleAddMonitora = () => {
        setEditingMonitora(null);
        setOpenForm(true);
    };

    const handleEditMonitora = (monitora) => {
        setEditingMonitora(monitora);
        setOpenForm(true);
    };

    const handleDeleteMonitora = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta monitora?')) {
            await deleteMonitora(id);
            fetchMonitoras();
        }
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setEditingMonitora(null);
    };

    const handleSaveMonitora = () => {
        fetchMonitoras();
        handleCloseForm();
    };

    return (
        <>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellidos</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Teléfono</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {monitoras.map((monitora) => (
                            <TableRow key={monitora.id}>
                                <TableCell>{monitora.nombre}</TableCell>
                                <TableCell>{monitora.apellidos}</TableCell>
                                <TableCell>{monitora.email}</TableCell>
                                <TableCell>{monitora.telefono}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditMonitora(monitora)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteMonitora(monitora.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Fab
                color="primary"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
                onClick={handleAddMonitora}
            >
                <AddIcon />
            </Fab>
            <Dialog open={openForm} onClose={handleCloseForm}>
                <MonitoraForm
                    monitora={editingMonitora}
                    onSave={handleSaveMonitora}
                    onCancel={handleCloseForm}
                />
            </Dialog>
        </>
    );
}

export default MonitorasList;

