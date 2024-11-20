import React, { useState, useEffect } from 'react';
import { Users, Calendar, Search } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';

// Componente para cada tarjeta de resumen
const DashboardCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center">
        <div className={`p-4 rounded-full mr-4 ${color}`}>
            <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{title}</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
        </div>
    </div>
);

// Componente para actividad reciente
const RecentActivity = ({ activities }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Actividad Reciente</h2>
        <ul className="space-y-4">
            {activities.map((activity, index) => (
                <li key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-indigo-500 rounded-full" />
                    <p className="flex-1 text-gray-800 dark:text-gray-300">
                        <span className="font-medium">{activity.action}</span> - {activity.client}
                    </p>
                    <span className="text-gray-500 dark:text-gray-400">{activity.time}</span>
                </li>
            ))}
        </ul>
    </div>
);

const Dashboard = () => {
    const [summaryData, setSummaryData] = useState([]);
    const [recentActivities, setRecentActivities] = useState([]);

    // Función para recuperar datos del backend
    const retrieveData = async () => {
        try {
            const response = await fetch(`/api/data`);
            if (!response.ok) throw new Error('Error al recuperar los datos');

            const data = await response.json();
            setSummaryData(data.summary || []);
            setRecentActivities(data.recentActivities || []);
        } catch (error) {
            console.error('Error al recuperar datos:', error);
        }
    };

    useEffect(() => {
        retrieveData(); // Llamada inicial al backend
    }, []);

    return (
        <AppLayout>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                {/* Barra superior */}
                <header className="bg-white dark:bg-gray-800 shadow-sm">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Dashboard</h1>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar..."
                                className="bg-gray-100 dark:bg-gray-700 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <Search className="w-5 h-5 text-gray-500 dark:text-gray-300 absolute left-3 top-2.5" />
                        </div>
                    </div>
                </header>

                {/* Contenido principal */}
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Tarjetas de resumen */}
                        {/* Hacer una funcion que cuente los estudiantes desde la bd */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg
                        :grid-cols-4">
                            {summaryData.map((item, index) => (
                                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md
                                :p-4">
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className="bg-gray-100 dark:bg-gray-700 rounded-full p-2">
                                            <img src={item.icon} alt={item.title} className="w-6 h-
                                            6" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-
                                                200">{item.title}</h3>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-gray-
                                                100">{item.value}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                            {summaryData.map((item, index) => (
                                <DashboardCard
                                    key={index}
                                    title={item.nombre}
                                    value={item.apellidos}
                                    icon={item.icon}
                                    color={item.color}
                                />
                            ))}
                        </div>

                        {/* Actividad Reciente */}
                        <RecentActivity activities={recentActivities} />
                    </div>
                </main>
            </div>
        </AppLayout>
    );
};

export default Dashboard;
