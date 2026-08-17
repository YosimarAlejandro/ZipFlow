import type { CompressionResponse } from "../../types/compression";

interface Props {
    result?: CompressionResponse;
}

export default function ResultCard({ result }: Props) {
    if (!result) return null; 

    // AQUÍ VA LA FUNCIÓN DE DESCARGA CON EL TOKEN JWT
    const handleDownload = async () => {
        try {
            const token = localStorage.getItem("token");
            
            // Asumiendo que result.id o result.optimizedFile trae el identificador del archivo
            const fileId = result.optimizedFile;

            const response = await fetch(`http://localhost:5039/api/files/download/${fileId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("No se pudo descargar el archivo");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            
            const a = document.createElement("a");
            a.href = url;
            a.download = result.optimizedFile || "archivo_optimizado.zip";
            document.body.appendChild(a);
            a.click();
            
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error al descargar:", error);
            alert("Error al intentar descargar el archivo.");
        }
    };

    return (
        <section className="mt-10">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-6 text-white">
                    <h2 className="text-3xl font-bold">
                        🎉 ¡Compresión completada!
                    </h2>
                    <p className="mt-2 text-green-100">
                        Tu archivo ya está optimizado y listo para descargar.
                    </p>
                </div>

                {/* Contenido */}
                <div className="p-8">
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="rounded-2xl bg-slate-50 p-6">
                            <p className="text-sm text-slate-500">
                                📄 Tamaño original
                            </p>
                            <h3 className="mt-2 text-3xl font-bold text-slate-800">
                                {result.originalSizeMB} MB
                            </h3>
                        </div>

                        <div className="rounded-2xl bg-blue-50 p-6">
                            <p className="text-sm text-slate-500">
                                ⚡ Tamaño optimizado
                            </p>
                            <h3 className="mt-2 text-3xl font-bold text-blue-600">
                                {result.optimizedSizeMB} MB
                            </h3>
                        </div>

                        <div className="rounded-2xl bg-green-50 p-6">
                            <p className="text-sm text-slate-500">
                                💾 Espacio ahorrado
                            </p>
                            <h3 className="mt-2 text-3xl font-bold text-green-600">
                                {result.reductionPercentage}%
                            </h3>
                        </div>
                    </div>

                    {/* Barra */}
                    <div className="mt-10">
                        <div className="mb-2 flex justify-between text-sm text-slate-500">
                            <span>Reducción conseguida</span>
                            <span>{result.reductionPercentage}%</span>
                        </div>
                        <div className="h-4 overflow-hidden rounded-full bg-slate-200">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-700"
                                style={{
                                    width: `${result.reductionPercentage}%`
                                }}
                            />
                        </div>
                    </div>

                    {/* Botón */}
                    <button
                        onClick={handleDownload}
                        className="
                            mt-10
                            w-full
                            rounded-2xl
                            bg-blue-600
                            px-6
                            py-4
                            text-lg
                            font-semibold
                            text-white
                            transition-all
                            hover:scale-[1.02]
                            hover:bg-blue-700
                        "
                    >
                        ⬇ Descargar archivo comprimido
                    </button>
                </div>
            </div>
        </section>
    );
}