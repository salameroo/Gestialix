// Dashboard.js
import React from 'react';
import { Users, Utensils, Calendar, TrendingUp, Bell, Search, ChevronDown } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';

const DashboardCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center">
        <div className={`rounded-full p-3 mr-4 ${color}`}>
            <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{title}</h3>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    </div>
);

const MenuItem = ({ name, icon: Icon }) => (
    <div className="flex items-center space-x-2 p-2 hover:bg-indigo-700 dark:hover:bg-indigo-600 rounded cursor-pointer">
        <Icon className="w-5 h-5" />
        <span>{name}</span>
    </div>
);

export default function Dashboard() {
    return (
        <AppLayout>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">


                {/* Contenido principal */}
                <div className="flex flex-col flex-1">
                    {/* Barra superior */}
                    <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
                        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Dashboard</h1>
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Buscar..."
                                        className="bg-gray-100 dark:bg-gray-700 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <Search className="w-5 h-5 text-gray-500 dark:text-gray-300 absolute left-3 top-2.5" />
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Contenido del dashboard */}
                    <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">
                        <div className="max-w-7xl mx-auto">
                            {/* Tarjetas de resumen */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                                <DashboardCard title="Clientes Activos" value="1,234" icon={Users} color="bg-blue-500" />
                                <DashboardCard title="Calendario de Eventos" value="8" icon={Calendar} color="bg-purple-500" />
                            </div>

                            {/* Sección de actividad reciente */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Actividad Reciente</h2>
                                <ul className="space-y-4">
                                    {[{ action: "Nuevo cliente registrado", client: "Cliente ABC", time: "Hace 1 día" }].map((item, index) => (
                                        <li key={index} className="flex items-center space-x-3 text-sm">
                                            <div className="flex-shrink-0">
                                                <span className="inline-block h-2 w-2 rounded-full bg-indigo-500"></span>
                                            </div>
                                            <p className="flex-1 text-gray-800 dark:text-gray-300">
                                                <span className="font-medium">{item.action}</span> - {item.client}
                                            </p>
                                            <span className="text-gray-500 dark:text-gray-400">{item.time}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </AppLayout>
    );
}
