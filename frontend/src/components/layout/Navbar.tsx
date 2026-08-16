import { Moon, Sun, Bell, User } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";


export default function Navbar() {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <nav className={`
            h-16 
            /* Si darkMode es true, usa gray-900, si no, usa bg-blue-600 */
            ${darkMode ? "bg-gray-900" : "bg-blue-600"}
            border-b border-blue-500 dark:border-gray-800
            flex items-center justify-between
            px-6
            shadow-sm
            transition-colors duration-300
        `}>

            <div className="flex items-center gap-3">
                {/* Ajusté el logo para que resalte con el nuevo fondo azul */}
                <div className="bg-white text-blue-600 font-bold rounded-xl px-3 py-2">
                    ZF
                </div>

                <h1 className="text-xl font-bold text-white">
                    ZipFlow
                </h1>
            </div>

            <div className="flex items-center gap-5">
                <button 
                    onClick={toggleTheme}
                    className="text-white hover:scale-110 transition"
                >
                    {darkMode ? <Sun size={22} /> : <Moon size={22} />}
                </button>

                <Bell className="text-white" />

                <div className="flex items-center w-full gap-2 text-white">
                    <User size={22} />
                    <span>Usuario</span>
                </div>
            </div>
        </nav>
    );
}