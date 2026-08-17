import { useState, useEffect } from "react";
import { Moon, Sun, Bell, User } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar() {
    const { darkMode, toggleTheme } = useTheme();
    const [userName, setUserName] = useState("Yosimar");
    const [userRole, setUserRole] = useState("User");

    useEffect(() => {
        // Lee lo que guardamos en el login
        const storedName = localStorage.getItem("userName");
        const storedRole = localStorage.getItem("userRole");
        
        if (storedName) setUserName(storedName);
        if (storedRole) setUserRole(storedRole);
    }, []);

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
                </div>
            </div>
        </nav>
    );
}