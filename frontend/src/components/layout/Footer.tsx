import { useTheme } from "../../context/ThemeContext";

export default function Footer() {
    const { darkMode } = useTheme();

    return (
        <footer className={`
            py-8 border-t transition-colors duration-300
            ${darkMode 
                ? "bg-slate-900 text-slate-400 border-slate-800" 
                : "bg-blue-600 text-blue-50 border-blue-500"
            }
        `}>
            <div className="max-w-6xl mx-auto px-6 text-center">
                <p className="text-sm">
                    © 2026 ZipFlow. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
}