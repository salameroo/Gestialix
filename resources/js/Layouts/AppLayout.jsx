import React, { useState } from 'react';
import SidebarMenu from './SideBar';

export default function AppLayout({ children, auth }) {
    console.log('Auth Props:', auth); // Muestra los datos de autenticación

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex min-h-screen w-full bg-gray-100 dark:bg-gray-300">
            <SidebarMenu isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} auth={auth} />
            <div
                className={`transition-all duration-300 w-full ${isSidebarOpen ? 'sm:ml-64 md:ml-20 ml-0' : 'sm:ml-20 ml-0'
                    }`}
            >
                <main>{children}</main>
            </div>
        </div>
    );
}

