import { Link } from "react-router-dom";
import logo from "../../assets/img/Logo.jpeg";

export default function Register() {

    return (

        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

            <div className="w-full max-w-md rounded-3xl bg-white shadow-xl p-8">

                <img
                    src={logo}
                    alt="ZipFlow"
                    className="w-24 mx-auto rounded-xl mb-6"
                />

                <h1 className="text-3xl font-bold text-center text-slate-800">

                    Únete a ZipFlow 🚀

                </h1>

                <p className="text-center text-slate-500 mt-3">

                    Crea una cuenta gratuita y obtén más compresiones.

                </p>

                <div className="mt-6 rounded-xl bg-blue-50 border border-blue-200 p-4">

                    <p className="font-semibold text-blue-700">

                        🎁 Al registrarte obtienes:

                    </p>

                    <ul className="mt-3 space-y-2 text-slate-600">

                        <li>✅ 3 compresiones adicionales</li>

                        <li>✅ Historial de archivos</li>

                        <li>✅ Acceso a futuras funciones</li>

                    </ul>

                </div>

                <form className="mt-8 space-y-5">

                    <input
                        type="text"
                        placeholder="Nombre completo"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        placeholder="Confirmar contraseña"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        className="
                        w-full
                        rounded-xl
                        bg-blue-600
                        py-3
                        text-white
                        font-semibold
                        hover:bg-blue-700
                        transition
                        "
                    >

                        Crear cuenta

                    </button>

                </form>

                <p className="mt-6 text-center text-slate-500">

                    ¿Ya tienes una cuenta?

                    <Link
                        to="/login"
                        className="ml-2 text-blue-600 hover:underline font-semibold"
                    >

                        Iniciar sesión

                    </Link>

                </p>

            </div>

        </div>

    );

}