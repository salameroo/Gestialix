import React from 'react';

const TituloPagina = ({ titulo, borderColor = 'gray-600' }) => {
    return (
        <div className={`relative py-12 mb-4 bg-${borderColor} dark:bg-${borderColor} rounded-lg w-full`}>
            {/* Título con gradiente */}
            <h1 className="text-2xl md:text-5xl text-center">
                <span className="bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-500 
                                dark:from-teal-400 dark:via-blue-400 dark:to-indigo-400 
                                text-transparent bg-clip-text">
                    {titulo}
                </span>
            </h1>

            {/* Línea decorativa */}
            <div
                className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-1  bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-500 
                            dark:from-teal-400 dark:via-blue-400 dark:to-indigo-400 opacity-75`}
            ></div>

            {/* Sombra o efecto adicional */}
            <div
                className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-0.5 
                            bg-gray-200 dark:bg-gray-800 opacity-30 animate-pulse`}
            ></div>
        </div>
    );
};

export default TituloPagina;
