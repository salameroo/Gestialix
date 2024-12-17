import React, { useState } from 'react';

export default function Logo({ isOpen = true, textPosition = "side" }) {
    const [imageSrc, setImageSrc] = useState("/images/gestialixLargo.webp");

    const handleError = () => {
        setImageSrc("/images/logoGestialix.svg");
    };

    return (
        <a href="/" className="block">
            <div
                className={`
                    flex items-center justify-center
                    ${textPosition === "side" ? "flex-row space-x-2" : "flex-col space-y-2"}
                `}
            >
                {/* Imagen del Logo */}
                <img
                    src={imageSrc}
                    alt="Gestialix Logo"
                    onError={handleError}
                    className="w-10 h-10 md:w-14 md:h-14 object-contain rounded-lg shadow-md"
                />

                {/* Texto del Logo */}
                {isOpen && (
                    <h1
                        className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-800 tracking-tight"
                    >
                        Gestialix
                    </h1>
                )}
            </div>
        </a>
    );
}
