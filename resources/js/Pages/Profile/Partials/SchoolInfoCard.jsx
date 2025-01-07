import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { School, Business, LocationOn, Apartment } from '@mui/icons-material';


const SchoolInfoCard = ({ school = {} }) => {
    const infoFields = [
        { label: 'Nombre del Colegio', value: school.name, icon: <School /> },
        { label: 'CIF', value: school.CIF, icon: <Business /> },
        { label: 'Dirección', value: school.address, icon: <LocationOn /> },
        { label: 'Ciudad', value: school.city, icon: <Apartment /> },
    ];

    return (
        <section>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Informacion del Colegio Registrado
                </h2>
            </header>
            <Card elevation={3} sx={{ maxWidth: 1200, margin: 'auto', mt: 4 }}>

                <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom sx={{
                        borderBottom: '2px solid #1976d2',
                        paddingBottom: 1,
                        marginBottom: 2,
                        color: '#1976d2',
                        fontWeight: 'bold',
                    }}>
                        Información del Colegio
                    </Typography>
                    <Grid container spacing={3}>
                        {infoFields.map((field, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <Box display="flex" alignItems="center">
                                    <Box sx={{ color: 'primary.main', marginRight: 2 }}>
                                        {field.icon}
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" color="textSecondary">
                                            {field.label}
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                            {field.value || 'No asignado'}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>
        </section>
    );
};

export default SchoolInfoCard;
