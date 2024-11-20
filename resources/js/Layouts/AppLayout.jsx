// AppLayout.js
import React, { useState } from 'react';
import SidebarMenu from './SideBar';

export default function AppLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Función para alternar el estado de la barra lateral
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex min-h-screen w-full bg-gray-100 ">
            {/* Barra lateral */}
            <SidebarMenu isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Contenedor principal para el contenido de la página */}
            <div
                className={`transition-all duration-300 w-full ${isSidebarOpen ? 'sm:ml-64 md:ml-20 ml-0' : 'sm:ml-20  ml-0'
                    }`}
            >
                {children}
            </div>
        </div>
    );
}
