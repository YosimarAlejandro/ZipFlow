import logo from "../../assets/img/Logo.jpeg";

export default function Hero() {
    return (
        <section className="px-6 pt-10 pb-6 transition-colors duration-300">
            <div className="max-w-5xl mx-auto text-center">
                <img
                    src={logo}
                    alt="ZipFlow"
                    className="w-28 md:w-32 mx-auto mb-6 rounded-2xl shadow-lg dark:shadow-blue-950/30"
                />

                <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 dark:text-slate-100 leading-tight">
                    Comprime tus archivos
                    <span className="block text-blue-600 dark:text-blue-400">
                        en segundos
                    </span>
                </h1>

                <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    Comprime archivos <strong className="text-slate-700 dark:text-slate-200">PDF</strong>, <strong className="text-slate-700 dark:text-slate-200">JPG</strong> y <strong className="text-slate-700 dark:text-slate-200">PNG</strong> de forma rápida, segura y sin instalar ningún programa.
                </p>
            </div>
        </section>
    );
}