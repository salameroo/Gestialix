import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import SidebarMenu from './SideBar';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/*  */}
            <div className="flex min-h-screen w-full bg-gray-100 dark:bg-gray-500">
                <SidebarMenu isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} userData={userData} />
                <div
                    className={`transition-all duration-300 w-full ${isSidebarOpen ? 'sm:ml-64 md:ml-20 ml-0' : 'sm:ml-20 ml-0'
                        }`}
                >
                    <header className=" bg-white shadow-md">
                        {/* <h1 className="text-xl font-bold">Bienvenido, {userData.user.name}</h1> */}
                    </header>
                    <main>{children}</main>
                </div>
            </div>
        </div>

    );
}
