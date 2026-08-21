import { useState, useEffect } from "react";
import { Moon, Sun, Bell, User, LogOut } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar() {
    const { darkMode, toggleTheme } = useTheme();
    const [userName, setUserName] = useState("Cargando...");
    const [userRole, setUserRole] = useState("...");

    useEffect(() => {
        const fetchNavbarUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const response = await fetch("http://localhost:5039/api/users/me", {
                    headers: { "Authorization": `Bearer ${token}` }
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.name) setUserName(data.name);
                    if (data.role) setUserRole(data.role);
                }
            } catch (error) {
                console.error("Error al cargar datos del usuario en el Navbar", error);
            }
        };

        fetchNavbarUser();
    }, []);

    // Función para cerrar sesión
    const handleLogout = () => {
        // Borramos el token y cualquier rastro guardado
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("userRole");

        // Redirigimos al login (ajusta la ruta si tu login es "/" o "/login")
        window.location.href = "/login";
    };

    return (
        <nav className={`
            h-16 
            ${darkMode ? "bg-gray-900" : "bg-blue-600"}
            border-b border-blue-500 dark:border-gray-800
            flex items-center justify-between
            px-6
            shadow-sm
            transition-colors duration-300
        `}>
            <div className="flex items-center gap-3">
                <div className="bg-white text-blue-600 font-bold rounded-xl px-3 py-2 shadow-sm">
                    ZF
                </div>
                <h1 className="text-xl font-bold text-white tracking-wide">
                    ZipFlow
                </h1>
            </div>

            <div className="flex items-center gap-5">
                <button 
                    onClick={toggleTheme}
                    className="text-white hover:scale-110 transition p-1"
                    title="Cambiar tema"
                >
                    {darkMode ? <Sun size={22} /> : <Moon size={22} />}
                </button>

                <button className="text-white hover:scale-110 transition p-1 relative">
                    <Bell size={22} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full"></span>
                </button>

                {/* Perfil del usuario dinámico */}
                <div className="flex items-center gap-3 pl-2 border-l border-blue-400/30 dark:border-gray-700">
                    <div className="w-10 h-10 rounded-full bg-white/10 dark:bg-gray-800 flex items-center justify-center text-white font-semibold border border-white/20">
                        <User size={20} />
                    </div>
                    <div className="hidden sm:flex flex-col text-left">
                        <span className="text-sm font-semibold text-white leading-tight">
                            {userName}
                        </span>
                        <span className="text-xs text-blue-100 dark:text-gray-400 font-medium capitalize">
                            {userRole}
                        </span>
                    </div>

                    {/* Botón de Cerrar Sesión */}
                    <button 
                        onClick={handleLogout}
                        className="ml-2 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition"
                        title="Cerrar sesión"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </div>
        </nav>
    );
}