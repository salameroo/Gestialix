import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Utensils, Users } from 'lucide-react';
import { Button } from '@/Components/ui/Buttons';
import Footer from '@/Components/ui/footer';
import Logo from '@/Components/ui/Logo';
import WordSlider from '@/Components/ui/WordSlider';
import { Head, Link } from '@inertiajs/react';
import { ThemeContext } from '@/utils/ThemeContext';
import { Sun, Moon } from 'lucide-react'; // Opcional: Iconos de sol y luna


export default function LandingPage(auth, laravelVersion, phpVersion) {

    const { darkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 flex flex-col">

            <Head title="Bienvenida" />
            <header className="bg-white shadow-md dark:bg-gray-900">
                <nav
                    className="container mx-auto px-4 sm:px-6 lg:px-8"
                    aria-label="Navegación principal"
                >
                    <div className="flex justify-between items-center py-4">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Logo />
                            <span className="sr-only">Gestialix - Plataforma de Gestión Escolar</span>
                        </div>
                        <nav className="-mx-3 flex flex-1 justify-end">
                            {/* Links */}
                            <div className="flex items-center space-x-4 sm:space-x-6">
                                <a
                                    href="/login"
                                    className="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-300"
                                    aria-label="Iniciar sesión"
                                >
                                    Iniciar sesión
                                </a>
                                <Button
                                    link="/register"
                                    text="Regístrate"
                                    aria-label="Registrarse"
                                />
                                {/* Botón para cambiar el tema */}
                                <button
                                    onClick={toggleTheme}
                                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:focus:ring-gray-500"
                                    aria-label={
                                        darkMode ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'
                                    }
                                >
                                    {darkMode ? (
                                        <Sun className="w-6 h-6 text-yellow-500" />
                                    ) : (
                                        <Moon className="w-6 h-6 text-blue-500" />
                                    )}
                                </button>
                            </div>
                        </nav>
                    </div>
                </nav>
            </header>

            <main className="flex-grow">
                {/* Hero Section */}
                <motion.div
                    className="relative bg-gradient-to-r from-green-600 to-blue-500 dark:from-gray-700 dark:to-gray-800 py-16 sm:py-24 text-white text-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1
                        className="text-4xl sm:text-5xl sm:p-0 p-2 md:text-6xl font-extrabold"
                        tabIndex={0}
                    >
                        Simplifica la Gestión de tu{" "}
                        <WordSlider
                            words={["Colegio", "Instituto", "Universidad", "Comedor"]}
                            interval={3000}
                        />
                    </h1>
                    <p
                        className="mt-4 text-lg p-2 sm:p-0 sm:text-xl max-w-2xl mx-auto"
                        tabIndex={0}
                    >
                        Una plataforma intuitiva y eficiente para organizar clases, gestionar
                        estudiantes y generar informes para optimizar los recursos de tu
                        comedor.
                    </p>
                    <div className="mt-8 flex justify-center space-x-4">
                        <Button
                            link="/"
                            text="Solicita una demo"
                            aria-label="Solicitar una demo"
                        />
                        <Button
                            link="/"
                            text="Ver Más"
                            variant="outline"
                            aria-label="Ver más información"
                        />
                    </div>
                </motion.div>

                {/* Features Section */}
                <section className="py-16 bg-white dark:bg-gray-900">
                    <div className="max-w-7xl mx-auto text-center">
                        <h2
                            className="text-3xl font-extrabold text-gray-900 dark:text-gray-100"
                            tabIndex={0}
                            aria-labelledby="features-title"
                            id="features-title"
                        >
                            Todo lo que necesitas para tu comedor
                        </h2>
                        <p
                            className="mt-4 text-lg text-gray-600 dark:text-gray-400"
                            tabIndex={0}
                            aria-describedby="features-title"
                        >
                            Desde el control de asistencia hasta la planificación de menús, Gestialix tiene todo cubierto.
                        </p>

                        <div
                            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                            role="list"
                        >
                            {[
                                {
                                    icon: Users,
                                    title: "Control de Estudiantes",
                                    description:
                                        "Administra fácilmente la información de tus estudiantes y sus necesidades específicas.",
                                },
                                {
                                    icon: Utensils,
                                    title: "Planificación de Menús",
                                    description:
                                        "Consulta menús balanceados considerando intolerancias y preferencias alimenticias.",
                                },
                                {
                                    icon: Check,
                                    title: "Generación de Informes",
                                    description:
                                        "Obtén reportes mensuales detallados listos para enviar a las autoridades educativas.",
                                },
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className="p-6 bg-gray-50 rounded-lg shadow flex flex-col items-center text-center dark:bg-gray-800"
                                    tabIndex={0}
                                    role="listitem"
                                    aria-labelledby={`feature-title-${index}`}
                                >
                                    <div
                                        className="flex justify-center items-center h-12 w-12 bg-green-700 text-white rounded-full dark:bg-green-600"
                                        aria-hidden="true"
                                    >
                                        <feature.icon className="w-6 h-6" />
                                    </div>
                                    <h3
                                        className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100"
                                        id={`feature-title-${index}`}
                                    >
                                        {feature.title}
                                    </h3>
                                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section
                    className="bg-gradient-to-r from-green-700 to-green-500 dark:bg-gradient-to-l  dark:from-gray-800 dark:to-gray-600 py-16 text-center text-white"
                    aria-labelledby="cta-title"
                >
                    <h2
                        className="text-3xl sm:text-4xl font-extrabold text-white"
                        id="cta-title"
                        tabIndex={0}
                    >
                        ¿Listo para transformar la gestión de tu comedor?
                    </h2>
                    <p
                        className="mt-4 text-lg p-2 sm:p-0 sm:text-xl max-w-2xl mx-auto text-white"
                        tabIndex={0}
                        aria-describedby="cta-title"
                    >
                        Comienza a usar Gestialix hoy mismo y simplifica tus operaciones como nunca antes.
                    </p>
                    <div className="mt-8 flex justify-center space-x-4">
                        {/* <Button
                            text={"Solicita una demo"}
                            aria-label="Solicitar una demo"
                            variant="outline"
                            link={"#"}
                        />
                        <Button
                            text={"Contáctanos"}
                            aria-label="Contáctanos"
                            variant="outline"
                            link={"#"}
                        /> */}
                        <Button
                            text="Solicita una demo"
                            link="/demo"
                            ariaLabel="Solicitar una demostración"
                            className="bg-green-700 hover:bg-green-800 text-white"
                        />

                        <Button
                            text="Cerrar sesión"
                            link="/logout"
                            ariaLabel="Cerrar la sesión actual"
                            className="bg-red-700 hover:bg-red-800 text-white"
                        />

                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );



}




