export default function HowItWorks() {
    return (
        <section className="bg-white dark:bg-slate-900 py-20 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-slate-800 dark:text-slate-100 mb-14">
                    ¿Cómo funciona?
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                        <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100">
                            1. Sube tu archivo
                        </h3>
                        <p className="mt-4 text-slate-600 dark:text-slate-400">
                            Selecciona un PDF, imagen o documento.
                        </p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                        <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100">
                            2. Comprimimos
                        </h3>
                        <p className="mt-4 text-slate-600 dark:text-slate-400">
                            Nuestro motor optimiza el tamaño del archivo.
                        </p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                        <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100">
                            3. Descarga
                        </h3>
                        <p className="mt-4 text-slate-600 dark:text-slate-400">
                            Obtén el archivo listo para usar.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}