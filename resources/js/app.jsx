import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ThemeProvider } from './ThemeContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createInertiaApp({
    // Aquí se resuelven todos los componentes React dentro de `resources/js/Pages`
    resolve: (name) =>
        resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),

    setup({ el, App, props }) {
        createRoot(el).render(
            <ThemeProvider>
                <ToastContainer />
                <App {...props} />
            </ThemeProvider>
        );
    },
});
