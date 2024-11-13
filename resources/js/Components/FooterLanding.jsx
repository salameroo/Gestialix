import { ArrowRight, Check, Utensils, Users, Carrot, DollarSign, Facebook, Twitter, Instagram } from 'lucide-react'


export default function FooterLanding({ children }) {
    return (
        <footer className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="flex justify-center space-x-6 md:order-2">
                        <a href="#" className="text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Facebook</span>
                            <Facebook className="h-6 w-6" aria-hidden="true" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Instagram</span>
                            <Instagram className="h-6 w-6" aria-hidden="true" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Twitter</span>
                            <Twitter className="h-6 w-6" aria-hidden="true" />
                        </a>
                    </div>
                    <div className="mt-8 md:mt-0 md:order-1">
                        <p className="text-center text-base text-gray-400">
                            &copy; 2023 ComeDirect. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}