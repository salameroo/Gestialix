import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, Inertia } from '@inertiajs/inertia-react';
import ButtonForms from './ButtonForms';

export default function ButtonProfile() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null); // Ref para el menú desplegable

    const handleLogout = () => {
        Inertia.post('/logout', {}, {
            onSuccess: () => console.log('Sesión cerrada exitosamente'),
        });
        setIsOpen(false);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // useEffect para detectar clics fuera del menú
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false); // Cerrar el menú si se hace clic fuera de él
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left">
            <div onClick={toggleMenu} className="cursor-pointer">
                <img
                    src="/images/favicon.png"
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-gray-200"
                />
            </div>

            {isOpen && (
                <motion.div
                    ref={menuRef} // Asignar el ref al menú desplegable
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                >
                    <ul className="py-1">
                        <li>
                            <Link
                                href="/inicio"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsOpen(false)}
                            >
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/profile"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsOpen(false)}
                            >
                                Perfil
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/dashboard"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsOpen(false)}
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/settings"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsOpen(false)}
                            >
                                Configuración
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/logout"
                                method='post'
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsOpen(false)}
                            >
                                Cerrar Sesión
                            </Link>
                        </li>
                    </ul>
                </motion.div>
            )}
        </div>
    );
}
