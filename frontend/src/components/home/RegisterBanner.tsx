import { useNavigate } from "react-router-dom";

export default function RegisterBanner() {
    const navigate = useNavigate();

    return (
        <section className="max-w-3xl mx-auto px-6 py-8 transition-colors duration-300">
            <div
                className="
                    rounded-3xl
                    border
                    border-blue-200/80
                    dark:border-blue-900/50
                    bg-gradient-to-r
                    from-blue-50
                    via-sky-50/50
                    to-white
                    dark:from-slate-900
                    dark:via-blue-950/40
                    dark:to-slate-900
                    p-8
                    shadow-md
                    dark:shadow-blue-950/20
                    text-center
                    transition-all
                "
            >
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    🎉 ¡Has utilizado tus 3 compresiones gratuitas!
                </h2>

                <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto">
                    Crea una cuenta gratuita y recibe <strong className="text-blue-700 dark:text-blue-400">3 compresiones adicionales</strong>,
                    además podrás administrar tus archivos y acceder a futuras funciones de ZipFlow.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                    <button
                        onClick={() => navigate("/register")}
                        className="
                            bg-emerald-600
                            hover:bg-emerald-700
                            text-white
                            font-semibold
                            px-6
                            py-3
                            rounded-xl
                            transition-all
                            shadow-sm
                            shadow-emerald-600/20
                        "
                    >
                        Crear cuenta gratis
                    </button>

                    <button
                        onClick={() => navigate("/login")}
                        className="
                            border
                            border-slate-300
                            dark:border-slate-700
                            bg-white/60
                            dark:bg-slate-800/60
                            hover:bg-slate-100
                            dark:hover:bg-slate-800
                            text-slate-700
                            dark:text-slate-200
                            font-semibold
                            px-6
                            py-3
                            rounded-xl
                            transition-all
                        "
                    >
                        Ya tengo una cuenta
                    </button>
                </div>
            </div>
        </section>
    );
}