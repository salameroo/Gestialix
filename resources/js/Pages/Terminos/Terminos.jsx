import React from 'react';

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Términos de Servicio</h1>

                <p className="text-gray-600 mb-4">
                    Estos términos de servicio describen las reglas y regulaciones para el uso de nuestra aplicación y servicios.
                    Al acceder o utilizar el servicio, aceptas estar sujeto a estos términos.
                </p>

                <hr className="my-6" />

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Condiciones Generales</h2>
                    <p className="text-gray-600">
                        Al utilizar nuestros servicios, declaras que tienes al menos la mayoría de edad en tu jurisdicción o
                        que cuentas con el consentimiento de un tutor legal.
                    </p>
                    <p className="text-gray-600 mt-2">
                        Está prohibido utilizar nuestros servicios para actividades ilegales, violar derechos de terceros
                        o distribuir contenido dañino.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Uso del Servicio</h2>
                    <p className="text-gray-600">
                        No puedes utilizar este servicio para cualquier propósito no autorizado. Esto incluye, entre otros,
                        el acceso no autorizado a nuestros sistemas o la distribución de contenido no permitido.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Propiedad Intelectual</h2>
                    <p className="text-gray-600">
                        Todo el contenido disponible en nuestra aplicación, incluidos textos, imágenes, logotipos y código,
                        es propiedad exclusiva de nuestra empresa o de nuestros socios, y está protegido por las leyes de derechos de autor.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Cancelación y Terminación</h2>
                    <p className="text-gray-600">
                        Nos reservamos el derecho de suspender o cancelar tu acceso al servicio si violas estos términos.
                        En caso de cancelación, perderás el acceso a cualquier contenido o información asociada con tu cuenta.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Limitación de Responsabilidad</h2>
                    <p className="text-gray-600">
                        En ningún caso seremos responsables por daños indirectos, incidentales o consecuentes derivados del uso
                        o la imposibilidad de usar nuestros servicios.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Cambios en los Términos</h2>
                    <p className="text-gray-600">
                        Nos reservamos el derecho de modificar estos términos en cualquier momento. Cualquier cambio será
                        notificado a través de la aplicación o por correo electrónico. Es tu responsabilidad revisar estos términos periódicamente.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Contacto</h2>
                    <p className="text-gray-600">
                        Si tienes alguna pregunta sobre estos términos, puedes contactarnos en <a href="mailto:soporte@tuapp.com" className="text-blue-500 hover:underline">soporte@tuapp.com</a>.
                    </p>
                </section>

                <hr className="my-6" />

                <div className="text-sm text-gray-500 text-center">
                    <p>&copy; {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.</p>
                </div>
            </div>
        </div>
    );
}
