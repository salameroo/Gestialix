import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Utensils, Users, Carrot, DollarSign, Facebook, Twitter, Instagram } from 'lucide-react'
import Button from '@/Components/ui/Button'
import FooterLanding from '@/Components/ui/FooterLanding'
import Logo from '@/Components/ui/Logo'

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col">
            <header className="bg-white shadow-sm">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center py-4 sm:py-6 space-y-4 sm:space-y-0">
                        <div className="flex justify-center sm:justify-start w-full sm:w-auto">
                            <Logo showText={false} sizeW={20} sizeH={20}></Logo>
                        </div>
                        <div className="flex items-center justify-center sm:justify-end w-full sm:w-auto space-x-4">
                            <a href="/login" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                                Iniciar sesión
                            </a>
                            <Button link={"/register"} text="Registrarse" className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700">
                            </Button>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="flex-grow">
                {/* Hero section */}
                <div className="relative">
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
                            <div className="absolute inset-0">
                                
                                <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-blue-700 mix-blend-multiply"></div>
                            </div>
                            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                                <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight">
                                    <span className="block text-white">Gestión inteligente</span>
                                    <span className="block text-green-200">para comedores escolares</span>
                                </h1>
                                <p className="mt-6 max-w-lg mx-auto text-center text-base sm:text-lg lg:text-xl text-white sm:max-w-3xl">
                                    Simplifica la administración de tu comedor escolar, mejora la nutrición de los estudiantes y optimiza tus recursos con ComeDirect.
                                </p>
                                <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                                    <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                                        <Button text={"Empezar ahora"} className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 sm:px-8 w-full">
                                        </Button>
                                        <Button text={"Saber más"} variant="outline" className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-green-700 bg-white hover:bg-green-50 sm:px-8 w-full">
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature section */}
                <div className="py-16 bg-white overflow-hidden lg:py-24">
                    <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
                        <div className="relative">
                            <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl leading-8 font-extrabold tracking-tight text-gray-900">
                                Una solución completa para tu comedor escolar
                            </h2>
                            <p className="mt-4 max-w-3xl mx-auto text-center text-base sm:text-lg lg:text-xl text-gray-500">
                                ComeDirect ofrece todas las herramientas que necesitas para gestionar eficientemente tu comedor escolar, desde la planificación de menús hasta el control de costos.
                            </p>
                        </div>

                        <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                            <div className="relative">
                                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
                                    Gestión simplificada
                                </h3>
                                <p className="mt-3 text-base sm:text-lg text-gray-500">
                                    Nuestra plataforma intuitiva te permite manejar todos los aspectos de tu comedor escolar desde un solo lugar, ahorrándote tiempo y reduciendo errores.
                                </p>

                                <dl className="mt-10 space-y-10">
                                    {[
                                        {
                                            icon: Users,
                                            title: "Control de asistencia",
                                            description: "Registra fácilmente la asistencia diaria y genera informes detallados."
                                        },
                                        {
                                            icon: Carrot,
                                            title: "Planificación de menús",
                                            description: "Crea menús equilibrados y gestiona las alergias e intolerancias alimentarias."
                                        },
                                        {
                                            icon: DollarSign,
                                            title: "Control de costos",
                                            description: "Optimiza tus gastos y reduce el desperdicio de alimentos con nuestras herramientas de análisis."
                                        },
                                    ].map((feature) => (
                                        <div key={feature.title} className="relative">
                                            <dt>
                                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                                                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                                                </div>
                                                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.title}</p>
                                            </dt>
                                            <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>

                            <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
                                <img
                                    className="relative mx-auto w-full max-w-[490px]"
                                    src="/placeholder.svg?height=490&width=490"
                                    alt="Dashboard de ComeDirect"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA section */}
                <div className="bg-green-50">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900">
                            <span className="block">¿Listo para mejorar tu comedor escolar?</span>
                            <span className="block text-green-600 mt-2">Pide una demostración gratuita y descubre las herramientas que tenemos para ti.</span>
                        </h2>
                        <div className="mt-8 flex flex-col sm:flex-row lg:mt-0 lg:flex-shrink-0 space-y-4 sm:space-y-0 sm:space-x-4">
                            <div className="inline-flex rounded-md shadow w-full sm:w-auto">
                                <Button link={route("register")} text={"Pide una demo"} className="w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                                    <ArrowRight className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
                                </Button>
                            </div>

                        </div>
                    </div>
                </div>
            </main>

            <FooterLanding />
        </div>
    )
}