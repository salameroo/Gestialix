import { LogOut } from 'lucide-react'


export default function ButtonDosDos({ text, link, type }) {
    return (
        <a href={link} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            {text}
            {text === "Cerrar sesión" && <LogOut className="h-4 w-4 mr-2 inline-block" />}
        </a>
    )
}