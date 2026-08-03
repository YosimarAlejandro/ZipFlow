import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

export default function PublicNavbar() {

    const { darkMode, toggleTheme } = useTheme();

    return (

        <nav className="
            h-16
            border-b
            bg-white
            dark:bg-gray-900
            dark:border-gray-800
            px-8
            flex
            items-center
            justify-between
        ">

            <Link
                to="/"
                className="flex items-center gap-3"
            >

                <div
                    className="
                    bg-blue-600
                    text-white
                    rounded-xl
                    px-3
                    py-2
                    font-bold
                    "
                >
                    ZF
                </div>

                <span className="
                    text-xl
                    font-bold
                    dark:text-white
                ">

                    ZipFlow

                </span>

            </Link>

            <div className="flex items-center gap-4">

                <Link
                    to="/login"
                    className="
                        text-slate-600
                        hover:text-blue-600
                        transition
                    "
                >
                    Iniciar sesión
                </Link>

                <Link
                    to="/register"
                    className="
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        transition
                    "
                >
                    Crear cuenta
                </Link>

                <button
                    onClick={toggleTheme}
                    className="
                        text-slate-600
                        dark:text-white
                    "
                >

                    {darkMode
                        ? <Sun size={22}/>
                        : <Moon size={22}/>
                    }

                </button>

            </div>

        </nav>

    );

}