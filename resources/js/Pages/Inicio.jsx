import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Bell, Settings } from 'lucide-react';
import PreferencesTab from '@/Components/ui/Preferences';
import { Link } from '@inertiajs/inertia-react';

// Botón estilizado
const TabButton = ({ icon: Icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center px-4 py-2 text-md font-medium rounded-lg transition-colors ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
    >
        <Icon className="w-5 h-5 mr-2" />
        {label}
    </button>
);

// Vista de opciones de usuario
export default function UserProfileSettingsView() {
    const [activeTab, setActiveTab] = useState('profile');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-xl mt-10">
            <h1 className="text-3xl font-bold text-center mb-8">Configuración de Usuario</h1>
            <div className="flex flex-col md:flex-row gap-6">
                <Link href='/dashboard'>dashboard</Link>
                <PreferencesTab />
                {/* Barra de navegación de pestañas */}
                <nav className="md:w-1/4 flex md:flex-col gap-4">
                    <TabButton
                        icon={User}
                        label="Perfil"
                        isActive={activeTab === 'profile'}
                        onClick={() => handleTabChange('profile')}
                    />
                    <TabButton
                        icon={Lock}
                        label="Seguridad"
                        isActive={activeTab === 'security'}
                        onClick={() => handleTabChange('security')}
                    />
                    <TabButton
                        icon={Bell}
                        label="Notificaciones"
                        isActive={activeTab === 'notifications'}
                        onClick={() => handleTabChange('notifications')}
                    />
                    <TabButton
                        icon={Settings}
                        label="Preferencias"
                        isActive={activeTab === 'settings'}
                        onClick={() => handleTabChange('settings')}
                    />
                </nav>

                {/* Contenido de las pestañas */}
                <div className="md:w-3/4 p-6 bg-gray-50 rounded-lg">
                    {activeTab === 'profile' && <ProfileTab />}
                    {activeTab === 'security' && <SecurityTab />}
                    {activeTab === 'notifications' && <NotificationsTab />}
                    {activeTab === 'settings' && <PreferencesTabDos />}
                </div>
            </div>
        </div>
    );
}

// Contenido de la pestaña de Perfil
const ProfileTab = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <h2 className="text-2xl font-semibold mb-4">Información de Perfil</h2>
        <div className="space-y-4">
            <InputField label="Nombre Completo" placeholder="Tu nombre" />
            <InputField label="Correo Electrónico" placeholder="tu@ejemplo.com" type="email" />
            <InputField label="Teléfono" placeholder="+34 600 000 000" type="tel" />
            <Button label="Guardar Cambios" />
        </div>
    </motion.div>
);

// Contenido de la pestaña de Seguridad
const SecurityTab = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <h2 className="text-2xl font-semibold mb-4">Seguridad</h2>
        <div className="space-y-4">
            <InputField label="Contraseña Actual" type="password" />
            <InputField label="Nueva Contraseña" type="password" />
            <InputField label="Confirmar Nueva Contraseña" type="password" />
            <Button label="Actualizar Contraseña" variant="danger" />
        </div>
    </motion.div>
);

// Contenido de la pestaña de Notificaciones
const NotificationsTab = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <h2 className="text-2xl font-semibold mb-4">Notificaciones</h2>
        <div className="space-y-4">
            <ToggleSwitch label="Notificaciones por Correo" />
            <ToggleSwitch label="Notificaciones Push" />
            <ToggleSwitch label="Notificaciones SMS" />
        </div>
    </motion.div>
);

// Contenido de la pestaña de Preferencias
const PreferencesTabDos = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <h2 className="text-2xl font-semibold mb-4">Preferencias</h2>
        <div className="space-y-4">
            <SelectField label="Idioma" options={['Español', 'Inglés']} />
            <SelectField label="Tema" options={['Claro', 'Oscuro']} />
            <Button label="Guardar Preferencias" />
        </div>
    </motion.div>
);

// Componentes auxiliares

// Campo de entrada (InputField)
const InputField = ({ label, placeholder, type = 'text' }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
            type={type}
            placeholder={placeholder}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
    </div>
);

// Botón estilizado (Button)
const Button = ({ label, variant }) => (
    <button
        className={`px-6 py-2 mt-4 font-semibold rounded-lg shadow ${variant === 'danger' ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
    >
        {label}
    </button>
);

// Interruptor (ToggleSwitch)
const ToggleSwitch = ({ label }) => (
    <div className="flex items-center justify-between">
        <span>{label}</span>
        <input type="checkbox" className="toggle-checkbox h-5 w-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-400" />
    </div>
);

// Campo de selección (SelectField)
const SelectField = ({ label, options }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <select className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-transparent">
            {options.map((option, idx) => (
                <option key={idx} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
);
