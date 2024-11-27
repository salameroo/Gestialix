import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Facebook, Mail } from 'lucide-react';
import { Inertia } from '@inertiajs/inertia';
import apiClient from '@/apiClient'; // Asegúrate de importar tu cliente Axios
import Footer from '@/Components/ui/footer';
import Logo from '@/Components/ui/Logo';
import { ButtonForms } from '@/Components/ui/Buttons';
import { client } from '@/apiClient';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Obtener el token CSRF antes de enviar la solicitud
            await client.get('/sanctum/csrf-cookie');

            // Enviar datos de inicio de sesión con Inertia
            Inertia.post(
                '/login',
                { email, password, remember: rememberMe },
                {
                    onSuccess: () => {
                        console.log('Login exitoso');
                    },
                    onError: (errorMessages) => {
                        setErrors(errorMessages); // Manejar errores en el estado
                    },
                }
            );
        } catch (error) {
            console.error('Error durante el inicio de sesión:', error);
            setErrors({ general: 'Ocurrió un error al iniciar sesión.' });
        }
    };

    const SocialLoginButton = ({ href, icon: Icon, text, color }) => (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
                href={href}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
                <Icon size={20} className={`mr-2 ${color}`} />
                {text}
            </a>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-md w-full"
            >
                <div className="p-8">
                    <div className="text-center flex flex-col items-center justify-center mb-8">
                        <Logo />
                        <p className="text-gray-600">Inicio de sesión</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Correo Electrónico
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="tu@ejemplo.com"
                                autoComplete="email"
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Tu contraseña"
                                    autoComplete="current-password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>

                        {errors.general && <p className="text-red-500 text-sm text-center">{errors.general}</p>}

                        <ButtonForms
                            text="Iniciar Sesión"
                            type="submit"
                            classNameProps="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        />
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">O continúa con</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-3">
                            <SocialLoginButton
                                href="/auth/facebook"
                                icon={Facebook}
                                text="Facebook"
                                color="text-blue-600"
                            />
                            <SocialLoginButton
                                href="/auth/google"
                                icon={Mail}
                                text="Google"
                                color="text-red-600"
                            />
                        </div>
                    </div>
                </div>

                <Footer text="¿No tienes una cuenta? Regístrate" link="/register" size="text-xs" />
            </motion.div>
        </div>
    );
}
