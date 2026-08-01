import type { CompressionResponse } from "../../types/compression";

interface Props {
    result: CompressionResponse;
}

export default function ResultCard({ result }: Props) {

    return (

        <section className="mt-10">

            <div className="rounded-2xl bg-white shadow-lg p-8">

                <h2 className="text-2xl font-bold text-green-600">

                    ✅ Compresión completada

                </h2>

                <div className="mt-8 grid md:grid-cols-3 gap-8">

                    <div>

                        <p className="text-slate-500">
                            Tamaño original
                        </p>

                        <h3 className="text-3xl font-bold">

                            {result.originalSizeMB} MB

                        </h3>

                    </div>

                    <div>

                        <p className="text-slate-500">
                            Tamaño optimizado
                        </p>

                        <h3 className="text-3xl font-bold text-blue-600">

                            {result.optimizedSizeMB} MB

                        </h3>

                    </div>

                    <div>

                        <p className="text-slate-500">
                            Reducción
                        </p>

                        <h3 className="text-3xl font-bold text-green-600">

                            {result.reductionPercentage} %

                        </h3>

                    </div>

                </div>

                <button
                    className="mt-10 rounded-xl bg-blue-600 px-8 py-3 text-white font-semibold hover:bg-blue-700"
                >
                    Descargar archivo
                </button>

            </div>

        </section>

    );

}