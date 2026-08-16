import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

export default function PublicNavbar() {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <nav
            className={`
                h-16 
                ${darkMode ? "bg-gray-900" : "bg-blue-600"}
                border-b border-blue-500/30 dark:border-gray-800
                flex items-center justify-between
                px-6
                shadow-sm
                transition-colors duration-300
            `}
        >
            <Link
                to="/"
                className="flex items-center gap-3 group"
            >
                <div className="bg-white text-blue-600 font-bold rounded-xl px-3 py-2 shadow-sm transition-transform group-hover:scale-105">
                    ZF
                </div>
                <span className="text-xl font-bold text-white tracking-wide">
                    ZipFlow
                </span>
            </Link>

            <div className="flex items-center gap-4">
                <Link
                    to="/login"
                    className="
                        text-slate-200
                        hover:text-white
                        dark:text-slate-300
                        dark:hover:text-white
                        font-medium
                        transition-colors
                    "
                >
                    Iniciar sesión
                </Link>

                <Link
                    to="/register"
                    className="
                        bg-white
                        text-blue-600
                        hover:bg-blue-50
                        dark:bg-blue-600
                        dark:text-white
                        dark:hover:bg-blue-500
                        px-4
                        py-2
                        rounded-lg
                        font-semibold
                        shadow-sm
                        transition-all
                    "
                >
                    Crear cuenta
                </Link>

                <button
                    onClick={toggleTheme}
                    className="
                        p-2
                        rounded-xl
                        bg-white/10
                        hover:bg-white/20
                        text-white
                        transition-colors
                        flex items-center justify-center
                    "
                    aria-label="Cambiar tema"
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>
        </nav>
    );
}