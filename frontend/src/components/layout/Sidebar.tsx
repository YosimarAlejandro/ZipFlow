import { useState } from "react";
import { Link } from "react-router-dom"; // <--- 1. IMPORTANTE: Importar Link
import { 
    Home, 
    Files, 
    Settings, 
    UserCircle, 
    ChevronLeft, 
    ChevronRight,
    Mail 
} from "lucide-react";

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    // 2. Agregamos las rutas (path) a cada elemento
    const mainMenuItems = [
        { icon: Home, text: "Inicio", path: "/dashboard" },
        { icon: Files, text: "Mis archivos", path: "/archivos" },
        { icon: UserCircle, text: "Perfil", path: "/perfil" } 
    ];

    const bottomMenuItems = [
        { icon: Mail, text: "Contacto", path: "/contacto" },
        { icon: Settings, text: "Configuración", path: "/configuracion" }
    ];

    const allMobileItems = [...mainMenuItems, ...bottomMenuItems];

    return (
        <>
            {/* =========================================
                VERSIÓN ESCRITORIO
            ========================================= */}
            <aside
                className={`
                    hidden md:flex flex-col
                    min-h-screen
                    bg-gray-100 dark:bg-gray-950
                    border-r dark:border-gray-800
                    p-5
                    transition-all duration-300 ease-in-out
                    ${isCollapsed ? "w-24" : "w-64"}
                `}
            >
                {/* Cabecera */}
                <div className={`flex items-center mb-8 ${isCollapsed ? "justify-center" : "justify-between"}`}>
                    {!isCollapsed && (
                        <span className="font-bold text-xl text-blue-600 dark:text-blue-500">
                            ZipFlow
                        </span>
                    )}
                    <button 
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-1.5 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                    >
                        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    </button>
                </div>

                {/* Menú Principal */}
                <div className="space-y-3 flex-1">
                    {mainMenuItems.map((item, index) => (
                        <MenuItem 
                            key={index}
                            icon={<item.icon size={20}/>}
                            text={item.text}
                            path={item.path} // <--- Pasamos la ruta
                            isCollapsed={isCollapsed}
                        />
                    ))}
                </div>

                {/* Botones de Abajo */}
                <div className={`mt-auto pt-6 flex ${isCollapsed ? "flex-col items-center gap-3" : "justify-start gap-3"}`}>
                    {bottomMenuItems.map((item, index) => (
                        <Link to={item.path} key={index} className="group relative"> {/* <--- Cambiado a Link */}
                            <div className="p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center">
                                <item.icon size={20} />
                            </div>
                            <div className="
                                absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 
                                bg-gray-800 text-white text-xs rounded-md 
                                opacity-0 group-hover:opacity-100 pointer-events-none 
                                transition-opacity whitespace-nowrap z-50
                            ">
                                {item.text}
                            </div>
                        </Link>
                    ))}
                </div>
            </aside>

            {/* =========================================
                VERSIÓN MÓVIL
            ========================================= */}
            <nav className="
                md:hidden 
                fixed bottom-0 left-0 right-0 
                bg-white dark:bg-gray-950 
                border-t border-gray-200 dark:border-gray-800 
                flex justify-around items-center 
                px-2 py-3 
                z-50
            ">
                {allMobileItems.map((item, index) => (
                    <Link 
                        key={index} 
                        to={item.path} // <--- Cambiado a Link para que navegue
                        className="flex flex-col items-center p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 cursor-pointer transition"
                    >
                        <item.icon size={22} />
                        <span className="text-[10px] mt-1 font-medium">{item.text}</span>
                    </Link>
                ))}
            </nav>
        </>
    );
}

// Subcomponente modificado para usar Link
function MenuItem({
    icon,
    text,
    path,
    isCollapsed
}: {
    icon: React.ReactNode,
    text: string,
    path: string, // <--- Recibe el path
    isCollapsed: boolean
}) {
    return (
        <Link
            to={path} // <--- Convierte el item en un enlace navegable
            className={`
                flex items-center 
                ${isCollapsed ? "justify-center px-0" : "gap-3 px-4"}
                py-3
                rounded-xl
                cursor-pointer
                text-gray-700 dark:text-gray-300
                hover:bg-blue-600 hover:text-white
                transition-all
                group relative
            `}
        >
            {icon}

            {!isCollapsed && (
                <span className="font-medium whitespace-nowrap">
                    {text}
                </span>
            )}

            {isCollapsed && (
                <div className="
                    absolute left-full ml-4 px-2 py-1 
                    bg-gray-800 text-white text-xs rounded-md 
                    opacity-0 group-hover:opacity-100 pointer-events-none 
                    transition-opacity whitespace-nowrap z-50
                ">
                    {text}
                </div>
            )}
        </Link>
    );
}