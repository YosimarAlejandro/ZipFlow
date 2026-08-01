export default function HowItWorks() {

    return (

        <section className="bg-white py-20">

            <div className="max-w-6xl mx-auto px-6">

                <h2 className="text-4xl font-bold text-center mb-14">
                    ¿Cómo funciona?
                </h2>

                <div className="grid md:grid-cols-3 gap-8">

                    <div className="bg-slate-50 rounded-2xl p-8 shadow">

                        <h3 className="font-bold text-xl">
                            1. Sube tu archivo
                        </h3>

                        <p className="mt-4 text-slate-600">
                            Selecciona un PDF, imagen o documento.
                        </p>

                    </div>

                    <div className="bg-slate-50 rounded-2xl p-8 shadow">

                        <h3 className="font-bold text-xl">
                            2. Comprimimos
                        </h3>

                        <p className="mt-4 text-slate-600">
                            Nuestro motor optimiza el tamaño del archivo.
                        </p>

                    </div>

                    <div className="bg-slate-50 rounded-2xl p-8 shadow">

                        <h3 className="font-bold text-xl">
                            3. Descarga
                        </h3>

                        <p className="mt-4 text-slate-600">
                            Obtén el archivo listo para usar.
                        </p>

                    </div>

                </div>

            </div>

        </section>

    );

}