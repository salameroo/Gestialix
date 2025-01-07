import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Checkbox,
    ListItemText,
} from '@mui/material';

const AddStudentModal = ({ open, onClose, onSave, classId, studentData = null }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        clase_id: '',
        pago: '',
        intolerancia_religion: [],
        intolerancia_especifica: '',
        beca: false,
    });

    useEffect(() => {
        if (studentData) {
            // Si hay datos del estudiante, carga los valores para editar
            setFormData({
                nombre: studentData.nombre || '',
                apellidos: studentData.apellidos || '',
                clase_id: studentData.clase_id || classId || '',
                pago: studentData.pago || '',
                intolerancia_religion: studentData.intolerancia_religion || [],
                intolerancia_especifica: studentData.intolerancia_especifica || '',
                beca: studentData.beca || false,
            });
        } else {
            // Inicializa los valores para un nuevo estudiante
            setFormData({
                nombre: '',
                apellidos: '',
                clase_id: classId || '',
                pago: '',
                intolerancia_religion: [],
                intolerancia_especifica: '',
                beca: false,
            });
        }
    }, [studentData, classId]);

    const intoleranciaOptions = [
        'No Carne',
        'No Credo',
        'Celiaco',
        'Lactosa',
        'Otros (Especificar)',
    ];

    const handleSave = () => {
        if (!formData.nombre || !formData.apellidos || !formData.pago) {
            alert('Por favor, completa los campos obligatorios.');
            return;
        }

        const intolerancias =
            formData.intolerancia_religion.includes('Otros (Especificar)') && formData.intolerancia_especifica
                ? [...formData.intolerancia_religion, formData.intolerancia_especifica]
                : formData.intolerancia_religion;

        onSave({
            ...formData,
            intolerancia_religion: intolerancias,
        });

        onClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>{studentData ? 'Editar Estudiante' : 'Añadir Nuevo Estudiante'}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                        <TextField
                            label="Nombre"
                            name="nombre"
                            fullWidth
                            variant="outlined"
                            value={formData.nombre}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Apellidos"
                            name="apellidos"
                            fullWidth
                            variant="outlined"
                            value={formData.apellidos}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Clase ID"
                            name="clase_id"
                            fullWidth
                            variant="outlined"
                            value={formData.clase_id}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="pago-label">Método de Pago</InputLabel>
                            <Select
                                labelId="pago-label"
                                name="pago"
                                value={formData.pago}
                                onChange={handleChange}
                            >
                                <MenuItem value="Beca">Beca</MenuItem>
                                <MenuItem value="Domiciliado">Domiciliado</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="intolerancia-label">Intolerancia Religiosa/Alimenticia</InputLabel>
                            <Select
                                labelId="intolerancia-label"
                                name="intolerancia_religion"
                                multiple
                                value={formData.intolerancia_religion}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        intolerancia_religion: e.target.value,
                                    }))
                                }
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {intoleranciaOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        <Checkbox checked={formData.intolerancia_religion.includes(option)} />
                                        <ListItemText primary={option} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {formData.intolerancia_religion.includes('Otros (Especificar)') && (
                        <Grid item xs={12}>
                            <TextField
                                label="Especificar Intolerancia"
                                name="intolerancia_especifica"
                                fullWidth
                                variant="outlined"
                                multiline
                                rows={3}
                                value={formData.intolerancia_especifica}
                                onChange={handleChange}
                            />
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="beca-label">Beca</InputLabel>
                            <Select
                                labelId="beca-label"
                                name="beca"
                                value={formData.beca.toString()}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        beca: e.target.value === 'true',
                                    }))
                                }
                            >
                                <MenuItem value="true">Sí</MenuItem>
                                <MenuItem value="false">No</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSave} variant="contained" color="primary">
                    {studentData ? 'Guardar Cambios' : 'Guardar'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddStudentModal;
