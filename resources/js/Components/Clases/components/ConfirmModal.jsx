import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

export function useConfirmationModal() {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [resolve, setResolve] = useState(null);

    const showConfirmationModal = (msg) => {
        setMessage(msg);
        setOpen(true);

        // Retornar una promesa que se resolverá según la decisión del usuario
        return new Promise((res) => setResolve(() => res));
    };

    const handleConfirm = () => {
        setOpen(false);
        resolve(true); // Resuelve la promesa como "true"
    };

    const handleCancel = () => {
        setOpen(false);
        resolve(false); // Resuelve la promesa como "false"
    };

    const ConfirmationModal = () => (
        <Dialog open={open} onClose={handleCancel}>
            <DialogTitle>Advertencia</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="secondary">
                    Cancelar
                </Button>
                <Button onClick={handleConfirm} color="primary">
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );

    return { showConfirmationModal, ConfirmationModal };
}
