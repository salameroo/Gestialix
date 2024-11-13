import React from "react"
import { ArrowLeft } from "lucide-react"

// Button component
const Button = React.forwardRef(
    ({ className, variant = "default", ...props }, ref) => {
        return (
            <button
                className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background
        ${variant === "default"
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : ""
                    }
        ${variant === "outline"
                        ? "border border-input hover:bg-accent hover:text-accent-foreground"
                        : ""
                    }
        ${className}`}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

// Card components
const Card = ({ className, ...props }) => (
    <div
        className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
        {...props}
    />
)
Card.displayName = "Card"

const CardHeader = ({ className, ...props }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
        {...props}
    />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={`text-sm text-muted-foreground ${className}`}
        {...props}
    />
))
CardDescription.displayName = "CardDescription"

const CardContent = ({ className, ...props }) => (
    <div className={`p-6 pt-0 ${className}`} {...props} />
)
CardContent.displayName = "CardContent"

const CardFooter = ({ className, ...props }) => (
    <div className={`flex items-center p-6 pt-0 ${className}`} {...props} />
)
CardFooter.displayName = "CardFooter"

// Separator component
const Separator = ({ className, ...props }) => (
    <div
        className={`shrink-0 bg-border h-[1px] w-full ${className}`}
        {...props}
    />
)
Separator.displayName = "Separator"

export default function PrivacyPolicy() {
    const currentYear = new Date().getFullYear()

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl shadow-xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-gray-800">
                        Política de Privacidad
                    </CardTitle>
                    <CardDescription>Comedor Escolar App</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">
                            1. Introducción
                        </h2>
                        <p className="text-gray-600">
                            En Comedor Escolar App, nos comprometemos a proteger la privacidad
                            de nuestros usuarios, especialmente considerando que muchos son
                            menores de edad. Esta política describe cómo recopilamos, usamos y
                            protegemos la información personal.
                        </p>
                    </section>

                    <Separator />

                    <section>
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">
                            2. Información que Recopilamos
                        </h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>
                                Información de registro: nombre, apellido, correo electrónico,
                                grado escolar.
                            </li>
                            <li>
                                Información dietética: alergias, restricciones alimentarias.
                            </li>
                            <li>
                                Información de uso: registros de comidas, preferencias
                                alimentarias.
                            </li>
                        </ul>
                    </section>

                    <Separator />

                    <section>
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">
                            3. Cómo Usamos la Información
                        </h2>
                        <p className="text-gray-600">
                            Utilizamos la información recopilada para:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>
                                Proporcionar y mejorar nuestros servicios de comedor escolar.
                            </li>
                            <li>Garantizar la seguridad alimentaria de los estudiantes.</li>
                            <li>Comunicarnos con padres o tutores sobre el servicio.</li>
                            <li>Cumplir con requisitos legales y reglamentarios.</li>
                        </ul>
                    </section>

                    <Separator />

                    <section>
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">
                            4. Protección de Datos
                        </h2>
                        <p className="text-gray-600">
                            Implementamos medidas de seguridad técnicas y organizativas para
                            proteger la información personal contra acceso no autorizado,
                            alteración, divulgación o destrucción.
                        </p>
                    </section>

                    <Separator />

                    <section>
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">
                            5. Derechos de los Usuarios
                        </h2>
                        <p className="text-gray-600">
                            Los usuarios o sus representantes legales tienen derecho a:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>Acceder a su información personal.</li>
                            <li>Corregir datos inexactos.</li>
                            <li>Solicitar la eliminación de sus datos.</li>
                            <li>Oponerse al procesamiento de sus datos.</li>
                        </ul>
                    </section>

                    <Separator />

                    <section>
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">
                            6. Contacto
                        </h2>
                        <p className="text-gray-600">
                            Para cualquier pregunta sobre esta política de privacidad, por
                            favor contacte a:
                        </p>
                        <p className="text-gray-600 font-semibold mt-2">
                            privacy@comedorescolar.app
                        </p>
                    </section>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 mt-6">
                    <Button variant="outline" className="mb-2 sm:mb-0">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Volver a la aplicación
                    </Button>
                    <p className="text-sm text-gray-500">
                        © {currentYear} Comedor Escolar App. Todos los derechos reservados.
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
