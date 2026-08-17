import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/img/Logo.jpeg";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // Reemplaza esta URL por la ruta de tu API si cambia (ej. localhost:5000/api/auth/login)
            const response = await fetch("http://localhost:5039/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Correo o contraseña incorrectos.");
            }
            // 👇 GUARDA EL NOMBRE Y ROL DIRECTO DEL BACKEND AQUí
            localStorage.setItem("userName", data.name || "Yosimar"); 
            localStorage.setItem("userRole", data.role || "User");
            // Guardamos el token en el Context y LocalStorage
            login(data.token);

            // Redirigimos al dashboard o inicio de la app autenticada
            navigate("/dashboard"); // Cambia la ruta según tu estructura
        } catch (err: any) {
            setError(err.message || "Ocurrió un error al iniciar sesión.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gray-50 dark:bg-slate-950 flex items-center justify-center p-4 sm:p-8 overflow-x-hidden font-sans transition-colors">
            <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden box-border border border-gray-100 dark:border-slate-800">
                
                {/* LADO IZQUIERDO: Branding */}
                <div className="hidden lg:flex lg:w-1/2 bg-blue-600 dark:bg-blue-900 p-12 flex-col justify-center items-center text-white relative overflow-hidden">
                    <div className="z-10 text-center">
                        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">ZipFlow</h1>
                        <p className="text-blue-100 text-lg max-w-xs mx-auto">
                            Optimiza, comprime y gestiona tus archivos en segundos.
                        </p>
                    </div>
                    <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform translate-x-1/2 translate-y-1/2"></div>
                </div>

                {/* LADO DERECHO: Formulario interactivo */}
                <div className="w-full lg:w-1/2 p-8 sm:p-14 flex flex-col justify-center box-border">
                    <div className="text-center lg:text-left mb-8">
                        <img src={logo} alt="Logo ZipFound" className="w-16 h-16 rounded-xl mx-auto lg:mx-0 mb-4 object-cover shadow-sm" />
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Bienvenido</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base">Inicia sesión en tu cuenta para continuar</p>
                    </div>

                    {/* Alerta de Error si falla el login */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm rounded-xl">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Correo electrónico</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="ejemplo@correo.com"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all box-border bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-800 text-gray-800 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all box-border bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-800 text-gray-800 dark:text-white"
                            />
                        </div>

                        <div className="flex flex-wrap items-center justify-between mt-2 gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Recordarme</span>
                            </label>
                            <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-4 bg-blue-600 text-white font-bold py-3.5 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all shadow-lg hover:shadow-xl disabled:bg-gray-400 dark:disabled:bg-slate-800 disabled:cursor-not-allowed"
                        >
                            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                        ¿No tienes una cuenta? <Link to="/register" className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 font-bold hover:underline transition-colors">Regístrate gratis</Link>
                    </p>
                </div>

            </div>
        </div>
    );
}