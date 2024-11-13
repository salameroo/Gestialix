import React from 'react';
import { motion } from 'framer-motion';

export default function ButtonForms({
    text = "Boton",       // Texto predeterminado del botón
    bgColor = "bg-green-600",   // Color de fondo predeterminado
    hoverColor = "bg-green-700", // Color al hacer hover
    ringColor = "ring-green-500", // Color del borde al hacer foco
    type = "button",             // Tipo del botón (button, submit, etc.)
    onClick,
    classNameProps                    // Evento onClick opcional
}) {
    return (
        <div className='flex justify-center'>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type={type}
                onClick={onClick}
                className={classNameProps}
            // className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${bgColor} hover:${hoverColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:${ringColor}`}
            >
                {text}
            </motion.button>
        </div>
    );
}
