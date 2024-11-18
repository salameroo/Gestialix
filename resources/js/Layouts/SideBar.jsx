import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Menu, X, Home, Users, BarChart, Settings, HelpCircle, Moon, Sun, LogOut } from 'lucide-react';

const MenuItem = ({ icon: Icon, label, isOpen, onClick }) => (
    <li
        onClick={onClick}
        className={`flex items-center p-2 rounded-lg transition-all duration-300 ease-in-out cursor-pointer 
                    ${isOpen ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : 'justify-center'}`}
    >
        <Icon className={`w-6 h-6 ${isOpen ? 'mr-4' : ''} text-gray-600 dark:text-gray-300`} />
        {isOpen && <span className="text-gray-700 dark:text-gray-300">{label}</span>}
    </li>
);

export default function SidebarMenu({ isOpen, toggleSidebar }) {
    const [isMobile, setIsMobile] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);

    const toggleTheme = () => setDarkMode(!darkMode);

    const navigateTo = (route) => {
        Inertia.visit(route);
        if (isMobile) toggleSidebar(); // Cierra el menú en dispositivos móviles al hacer clic
    };

    const handleLogout = () => {
        Inertia.post('/logout', {}, {
            onSuccess: () => console.log('Sesión cerrada exitosamente'),
        });
    };

    return (
        <div
            className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out
                        ${isOpen ? 'w-64' : 'w-20'} ${isMobile && !isOpen ? '-translate-x-full' : ''}`}
        >
            <button
                onClick={toggleSidebar}
                className={`absolute top-4 -right-12 bg-white dark:bg-white p-2 rounded-full shadow-md transition-transform duration-300 ease-in-out
                            ${isOpen ? 'rotate-180' : ''}`}
                aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
                {isOpen ? <X className="w-6 h-6 text-gray-600 dark:text-black" /> : <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />}
            </button>

            <div className={`flex items-center justify-center h-20 ${isOpen ? 'px-4' : ''}`}>
                <img src="/images/logoGestialix.svg" alt="Logo" className="w-10 h-10" />
                {isOpen && <h1 className="ml-4 text-xl font-bold text-gray-700 dark:text-gray-300">Gestialix</h1>}
            </div>

            <button
                onClick={toggleTheme}
                className="mt-4 flex items-center justify-center text-gray-600 dark:text-gray-300 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out"
            >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                {isOpen && <span className="ml-2">{darkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>}
            </button>

            <nav className="flex-grow">
                <ul className="space-y-2 py-4">
                    <MenuItem icon={Home} label="Inicio" isOpen={isOpen} onClick={() => navigateTo('/inicio')} />
                    <MenuItem icon={BarChart} label="Panel de control" isOpen={isOpen} onClick={() => navigateTo('/dashboard')} />
                    <MenuItem icon={Users} label="Clases" isOpen={isOpen} onClick={() => navigateTo('/clases')} />
                    <MenuItem icon={Settings} label="Configuración" isOpen={isOpen} onClick={() => navigateTo('/configuracion')} />
                    <MenuItem icon={HelpCircle} label="Ayuda" isOpen={isOpen} onClick={() => navigateTo('/ayuda')} />
                </ul>
            </nav>

            {/* Botón de cierre de sesión */}
            <MenuItem icon={LogOut} label="Cerrar sesión" isOpen={isOpen} onClick={handleLogout} />

            <div className={`p-4 ${isOpen ? 'text-center' : 'flex justify-center'}`}>
                {isOpen ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 Gestialix</p>
                ) : (
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                )}
            </div>
        </div>
    );
}
