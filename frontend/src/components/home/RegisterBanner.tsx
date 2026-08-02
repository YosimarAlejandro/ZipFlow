import { useNavigate } from "react-router-dom";

export default function RegisterBanner() {

    const navigate = useNavigate();

    return (

        <section className="max-w-3xl mx-auto px-6 py-8">

            <div
                className="
                    rounded-2xl
                    border
                    border-blue-200
                    bg-gradient-to-r
                    from-blue-50
                    to-white
                    p-8
                    shadow-sm
                    text-center
                "
            >

                <h2 className="text-2xl font-bold text-slate-800">

                    🎉 ¡Has utilizado tus 3 compresiones gratuitas!

                </h2>

                <p className="mt-4 text-slate-600 leading-relaxed">

                    Crea una cuenta gratuita y recibe <strong>3 compresiones adicionales</strong>,
                    además podrás administrar tus archivos y acceder a futuras funciones de ZipFlow.

                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

                    <button
                        onClick={() => navigate("/register")}
                        className="
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            font-semibold
                            px-6
                            py-3
                            rounded-xl
                            transition
                        "
                    >
                        Crear cuenta gratis
                    </button>

                    <button
                        onClick={() => navigate("/login")}
                        className="
                            border
                            border-slate-300
                            hover:bg-slate-100
                            text-slate-700
                            font-semibold
                            px-6
                            py-3
                            rounded-xl
                            transition
                        "
                    >
                        Ya tengo una cuenta
                    </button>

                </div>

            </div>

        </section>

    );
}