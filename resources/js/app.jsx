import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ThemeProvider } from './ThemeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient, { setAuthToken } from './apiClient';

const AppWrapper = ({ App, props }) => {
    useEffect(() => {
        // Configurar el token al cargar la aplicación
        const token = localStorage.getItem('authToken');
        if (token) {
            setAuthToken(token); // Configura el token en Axios
        }
    }, []);

    return (
        <ThemeProvider>
            <ToastContainer />
            <App {...props} />
        </ThemeProvider>
    );
};

createInertiaApp({
    resolve: (name) =>
        resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),

    setup({ el, App, props }) {
        createRoot(el).render(<AppWrapper App={App} props={props} />);
    },
});
