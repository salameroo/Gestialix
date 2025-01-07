import React, { useState, useEffect } from 'react';
import { Users, Calendar, Search, User, ClipboardCheck, BookOpen, Moon, Sun } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import csrfFetch from '@/utils/csrfFetch';
import TituloPagina from '@/Components/TitlePage';
import ExportarAsistencias from '../Exports/Inicio';

const DashboardCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:scale-105">
        <div className={`p-4 rounded-full mb-4 ${color}`}>
            <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200">{title}</h3>
        <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{value}</p>
    </div>
);

const RecentActivity = ({ activities }) => (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
        <h2 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200 mb-4">Actividad Reciente</h2>
        <ul className="space-y-4">
            {activities.map((activity, index) => (
                <li key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200">
                    <div className="flex-shrink-0 w-2 h-2 bg-indigo-500 rounded-full" />
                    <p className="flex-1 text-neutral-800 dark:text-neutral-300">
                        <span className="font-medium">{activity.action}</span> - {activity.client}
                    </p>
                    <span className="text-neutral-500 dark:text-neutral-400">{activity.time}</span>
                </li>
            ))}
        </ul>
    </div>
);

const FeatureCard = ({ title, description, icon: Icon, link }) => (
    <a
        href={link}
        className="p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-md hover:shadow-lg transition duration-300 hover:scale-105 group"
    >
        <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-4 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 transition-colors duration-300">
            <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-200" />
        </div>
        <h3 className="text-lg font-medium text-neutral-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
            {title}
        </h3>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            {description}
        </p>
    </a>
);

const Dashboard = () => {
    const [summaryData, setSummaryData] = useState([]);
    const [recentActivities, setRecentActivities] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    const retrieveData = async () => {
        try {
            const response = await csrfFetch(`/api/activities`);
            if (!response.ok) throw new Error('Error al recuperar los datos');

            const data = await response.json();
            setSummaryData(data.summary || []);
            setRecentActivities(data.recentActivities || []);
        } catch (error) {
            console.error('Error al recuperar datos:', error);
        }
    };

    useEffect(() => {
        retrieveData();
        // Check for user's preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const features = [
        {
            title: "Gestión de Usuarios",
            description: "Administra fácilmente los usuarios de tu sistema.",
            icon: User,
            link: "/clases",
        },
        {
            title: "Asistencias",
            description: "Controla la asistencia de clases y reportes.",
            icon: ClipboardCheck,
            link: "/asistencias",
        },
        {
            title: "Calendario",
            description: "Consulta los eventos y actividades programadas.",
            icon: Calendar,
            link: "/clases",
        },
        {
            title: "Documentación",
            description: "Accede a manuales y tutoriales para ayudarte.",
            icon: BookOpen,
            link: "/terms",
        },
    ];

    return (
        <AppLayout>
            <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 transition-colors duration-300">
                <header className="bg-white dark:bg-neutral-800 shadow-sm transition-colors duration-300">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <TituloPagina titulo="Panel de Control" borderColor="transparent" />
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    className="bg-neutral-100 dark:bg-neutral-700 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
                                />
                                <Search className="w-5 h-5 text-neutral-500 dark:text-neutral-300 absolute left-3 top-2.5" />
                            </div>
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 transition-colors duration-300"
                            >
                                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-7xl mx-auto space-y-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {summaryData.map((item, index) => (
                                <DashboardCard
                                    key={index}
                                    title={item.title}
                                    value={item.value}
                                    icon={item.icon}
                                    color={item.color}
                                />
                            ))}
                        </div>

                        <RecentActivity activities={recentActivities} />

                        <div className="mt-10">
                            <h2 className="text-2xl font-bold text-neutral-800 dark:text-white mb-6">Accesos Rápidos</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {features.map((feature, index) => (
                                    <FeatureCard key={index} {...feature} />
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
                <ExportarAsistencias />
            </div>
        </AppLayout>
    );
};

export default Dashboard;

