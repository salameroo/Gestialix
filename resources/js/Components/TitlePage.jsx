import React from 'react';

const TituloPagina = ({
    titulo,
    borderColor = "transparent",
    darkBorderColor = "transparent",
    textColor = "gray-800",
    darkTextColor = "white",
    gradientFrom = "gray-500",
    gradientVia = "pink-500",
    gradientTo = "red-500",
    darkGradientFrom = "gray-300",
    darkGradientVia = "gray-400",
    darkGradientTo = "gray-300",
    className = '',
    titleClassName = '',
}) => {
    return (
        <div className={`
      relative py-12 mb-4 
      bg-${borderColor} dark:bg-${darkBorderColor} 
      rounded-lg w-full
      ${className}
    `}>
            {/* Título con gradiente */}
            <h1 className={`
        text-2xl md:text-5xl text-center
        ${titleClassName}
      `}>
                <span className={`
          bg-gradient-to-r 
          from-${gradientFrom} via-${gradientVia} to-${gradientTo}
          dark:from-${darkGradientFrom} dark:via-${darkGradientVia} dark:to-${darkGradientTo}
          bg-clip-text
          text-${textColor} dark:text-${darkTextColor}
        `}>
                    {titulo}
                </span>
            </h1>

            {/* Línea decorativa */}
            <div
                className={`
          absolute bottom-0 left-1/2 transform -translate-x-1/2 
          w-64 h-1
          bg-gradient-to-r 
          from-${gradientFrom} via-${gradientVia} to-${gradientTo}
          dark:from-${darkGradientFrom} dark:via-${darkGradientVia} dark:to-${darkGradientTo}
          opacity-75
        `}
            ></div>

            {/* Sombra o efecto adicional */}
            <div
                className={`
          absolute bottom-0 left-1/2 transform -translate-x-1/2 
          w-64 h-0.5 
          bg-gray-200 dark:bg-gray-800 
          opacity-30 animate-pulse
        `}
            ></div>
        </div>
    );
};

export default TituloPagina;

