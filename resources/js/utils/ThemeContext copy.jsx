import React, { createContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// Temas de Material-UI
const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#9c27b0',
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#f48fb1',
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
    },
});

// Crear el contexto
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Inicializar tema basado en localStorage o preferencia del sistema
    const [darkMode, setDarkMode] = useState(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) return storedTheme === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    // Sincronizar tema con Tailwind y localStorage
    useEffect(() => {
        const root = document.documentElement;

        if (darkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        // Guardar preferencia en localStorage
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    // Alternar tema
    const toggleTheme = () => setDarkMode((prev) => !prev);

    // Seleccionar el tema correcto para Material-UI
    const muiTheme = darkMode ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            <MuiThemeProvider theme={muiTheme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};
