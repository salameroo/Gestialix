import React, { useEffect, useState, useContext } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Menu, Grid2x2, X, Home, Users, BarChart, Settings, HelpCircle, Moon, Sun, LogOut, List, ChevronDown } from 'lucide-react';
import { ThemeContext } from '../utils/ThemeContext';
import Logo from '@/Components/ui/Logo';
import csrfFetch from '@/utils/csrfFetch';

const MenuItem = ({ icon: Icon, label, isOpen, onClick, isActive }) => (
    <li
        onClick={onClick}
        className={`relative flex items-center p-2 rounded-lg transition-all duration-300 ease-in-out cursor-pointer 
                    ${isOpen ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : 'justify-center'}
                    ${isActive ? 'bg-blue-400 dark:bg-gray-600' : ''}`}
        title={!isOpen ? label : ''} // Tooltip para cuando el menú esté colapsado
    >
        <Icon
            className={`relative z-10 w-6 h-6 ${isOpen ? 'mr-4' : ''} 
                        ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400'}`}
        />
        {isOpen && (
            <span
                className={`relative z-10 ${isActive ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400'}`}
            >
                {label}
            </span>
        )}
    </li>
);

export default function SidebarMenu({ isOpen, toggleSidebar }) {
    const [isMobile, setIsMobile] = useState(false);
    const { darkMode, toggleTheme } = useContext(ThemeContext);
    const [userData, setUserData] = useState(null);
    const [schoolData, setSchoolData] = useState(null);
    const [showUserInfo, setShowUserInfo] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await csrfFetch('/api/user');
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data.user);
                    setSchoolData(data.school);
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const currentPath = window.location.pathname;

    const navigateTo = (route) => {
        Inertia.visit(route);
        if (isMobile) toggleSidebar();
    };

    const handleLogout = () => {
        Inertia.post('/logout', {}, {
            onSuccess: () => console.log('Sesión cerrada exitosamente'),
        });
    };

    return (
        <div
            className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-white dark:bg-neutral-900 shadow-lg transition-all duration-300 ease-in-out
                        ${isOpen ? 'w-64 px-2' : 'w-20'} ${isMobile && !isOpen ? '-translate-x-full' : ''}`}
        >
            <button
                onClick={toggleSidebar}
                className={`absolute top-4 -right-12 bg-white dark:bg-gray-900 p-2 rounded-full shadow-md transition-transform duration-300 ease-in-out
                            ${isOpen ? 'rotate-180' : ''}`}
                aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
                {isOpen ? <X className="w-6 h-6 text-gray-600 dark:text-white" /> : <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />}
            </button>

            <div className="p-4">
                <Logo isOpen={isOpen} />
            </div>

            {isOpen && userData && schoolData && (
                <div className="px-4 py-2 mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{schoolData.name}</h2>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{schoolData.city}</p>
                </div>
            )}
            <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-center text-gray-600 dark:text-gray-300 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out"
            >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                {isOpen && <span className="ml-2">{darkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>}
            </button>
            <nav className="flex-grow overflow-y-auto">
                <ul className="space-y-2 py-4">
                    <MenuItem
                        icon={Home}
                        label="Inicio"
                        isOpen={isOpen}
                        onClick={() => navigateTo('/inicio')}
                        isActive={currentPath === '/inicio'}
                    />
                    <MenuItem
                        icon={BarChart}
                        label="Panel de control"
                        isOpen={isOpen}
                        onClick={() => navigateTo('/dashboard')}
                        isActive={currentPath === '/dashboard'}
                    />
                    <MenuItem
                        icon={Users}
                        label="Clases"
                        isOpen={isOpen}
                        onClick={() => navigateTo('/clases')}
                        isActive={currentPath === '/clases'}
                    />
                    <MenuItem
                        icon={List}
                        label="Asistencias"
                        isOpen={isOpen}
                        onClick={() => navigateTo('/asistencias')}
                        isActive={currentPath === '/asistencias'}
                    />
                    <MenuItem
                        icon={Grid2x2}
                        label="Cuadricula"
                        isOpen={isOpen}
                        onClick={() => navigateTo('/info')}
                        isActive={currentPath === '/info'}
                    />
                    <MenuItem
                        icon={Settings}
                        label="Configuración"
                        isOpen={isOpen}
                        onClick={() => navigateTo('/profile')}
                        isActive={currentPath === '/profile'}
                    />
                    <MenuItem
                        icon={HelpCircle}
                        label="Ayuda"
                        isOpen={isOpen}
                        onClick={() => navigateTo('/terms')}
                        isActive={currentPath === '/terms'}
                    />

                </ul>
            </nav>

            <div className="mt-auto">
                {userData && (
                    <div className={`p-4 ${isOpen ? 'border-t border-gray-200 dark:border-gray-700' : ''}`}>
                        {isOpen ? (
                            <div>
                                <button
                                    onClick={() => setShowUserInfo(!showUserInfo)}
                                    className="flex items-center justify-between w-full text-left"
                                >
                                    <div>
                                        <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                            {userData.name}
                                        </h2>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            {userData.email}
                                        </p>
                                    </div>
                                    <ChevronDown className={`w-4 h-4 transition-transform ${showUserInfo ? 'transform rotate-180' : ''}`} />
                                </button>
                                {showUserInfo && (
                                    <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                        <p className="text-xs text-gray-600 dark:text-gray-400">ID: {userData.id}</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">School ID: {userData.school_id}</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex justify-center">
                                <div className="w-3 h-3 bg-green-500 rounded-full" title={userData.name}></div>
                            </div>
                        )}
                    </div>
                )}


                <MenuItem
                    icon={LogOut}
                    label="Cerrar sesión"
                    isOpen={isOpen}
                    onClick={handleLogout}
                    isActive={false}
                />

                <div className={`p-4 ${isOpen ? 'text-center' : 'flex justify-center'}`}>
                    {isOpen ? (
                        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Gestialix</p>
                    ) : (
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    )}
                </div>
            </div>
        </div>
    );
}


