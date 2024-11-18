export default function Footer({ textDos, text, link }) {
    return (
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex flex-col justify-between items-center">
            <div className="text-xs text-gray-500 mb-2 sm:mb-0">
                {textDos}
                <a href={link} className="font-medium text-green-600 hover:text-green-500">
                    {text}
                </a>
            </div>
            <div className="text-xs text-gray-500 text-center">
                © 2024 Comedor Escolar App. Todos los derechos reservados.
            </div>
        </div>
    );
}