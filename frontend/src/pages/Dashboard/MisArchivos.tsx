import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Trash2, Download, FileText } from "lucide-react";

export default function MisArchivos() {
    const [archivos, setArchivos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArchivos = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:5039/api/files/history", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) throw new Error("Error al cargar archivos");

                const data = await response.json();
                setArchivos(data);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArchivos();
    }, []);

    const handleDownload = (id: string, fileName: string) => {
        console.log("Descargando archivo:", id, fileName);
    };

    return (
        <DashboardLayout>
            <div className="w-full px-4 sm:px-6 lg:px-8 pb-10">
                {/* Header de la sección */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mis Archivos</h1>
                    <p className="text-sm text-gray-500">Gestiona tus archivos comprimidos.</p>
                </div>

                {/* Contenedor principal de la tabla */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="p-8 text-center text-gray-500">Cargando tus archivos...</div>
                    ) : archivos.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">No tienes archivos comprimidos aún.</div>
                    ) : (
                        /* Contenedor con scroll propio tanto horizontal como vertical para que "viva" ahí */
                        <div className="w-full overflow-x-auto max-h-[550px] overflow-y-auto">
                            <table className="w-full text-left min-w-[750px] border-collapse">
                                <thead className="bg-gray-50 dark:bg-gray-950 text-gray-500 text-xs uppercase tracking-wider sticky top-0 z-10">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold bg-gray-50 dark:bg-gray-950">Archivo Original</th>
                                        <th className="px-6 py-4 font-semibold bg-gray-50 dark:bg-gray-950">Tamaño Original</th>
                                        <th className="px-6 py-4 font-semibold bg-gray-50 dark:bg-gray-950">Tamaño Optimizado</th>
                                        <th className="px-6 py-4 font-semibold bg-gray-50 dark:bg-gray-950">Reducción</th>
                                        <th className="px-6 py-4 font-semibold bg-gray-50 dark:bg-gray-950">Nivel</th>
                                        <th className="px-6 py-4 font-semibold bg-gray-50 dark:bg-gray-950">Fecha</th>
                                        <th className="px-6 py-4 font-semibold text-right bg-gray-50 dark:bg-gray-950">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {archivos.map((archivo: any) => (
                                        <tr key={archivo.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                                            <td className="px-6 py-4 flex items-center gap-3">
                                                <div className="p-2 bg-blue-50 dark:bg-blue-950 text-blue-600 rounded-lg shrink-0">
                                                    <FileText size={18} />
                                                </div>
                                                <span className="font-medium text-gray-900 dark:text-white text-sm truncate max-w-[200px]" title={archivo.originalFileName}>
                                                    {archivo.originalFileName}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                {archivo.originalSizeMB ? `${Number(archivo.originalSizeMB).toFixed(2)} MB` : "N/A"}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                                                {archivo.optimizedSizeMB ? `${Number(archivo.optimizedSizeMB).toFixed(2)} MB` : "N/A"}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-blue-600 dark:text-blue-400 font-semibold">
                                                file{archivo.reductionPercentage ? `${Number(archivo.reductionPercentage).toFixed(1)}%` : "0%"}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                                                    {archivo.compressionLevel}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                {new Date(archivo.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button 
                                                        onClick={() => handleDownload(archivo.id, archivo.optimizedFileName)}
                                                        className="p-2 text-gray-400 hover:text-blue-600 transition"
                                                        title="Descargar"
                                                    >
                                                        <Download size={18} />
                                                    </button>
                                                    <button className="p-2 text-gray-400 hover:text-red-600 transition" title="Eliminar">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}