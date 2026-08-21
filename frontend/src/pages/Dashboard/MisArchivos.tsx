import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Trash2, Download, FileText } from "lucide-react";
import Swal from 'sweetalert2';

export default function MisArchivos() {
    const [archivos, setArchivos] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleDelete = async (fileId: string) => {
        // Detectamos si el modo oscuro está activo en el HTML
        const isDark = document.documentElement.classList.contains('dark');
        
        // Configuramos colores dinámicos: Azul para Light, Gris para Dark
        const swalBackground = isDark ? '#374151' : '#4040fb'; // Gris oscuro / Azul clarito
        const swalTextColor = isDark ? '#ffffffff' : '#ffffffff';  // Blanco / Azul fuerte

        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás recuperar este archivo!",
            icon: 'warning',
            background: swalBackground,
            color: swalTextColor,
            showCancelButton: true,
            confirmButtonColor: '#ef4444', // Rojo para el botón de borrar
            cancelButtonColor: isDark ? '#6b7280' : '#0303b5', // Gris o Azul para cancelar
            confirmButtonText: 'Sí, ¡bórralo!',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`http://localhost:5039/api/files/${fileId}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) throw new Error("No se pudo eliminar");

                Swal.fire({
                    title: '¡Eliminado!',
                    text: 'Tu archivo ha sido borrado.',
                    icon: 'success',
                    background: swalBackground,
                    color: swalTextColor,
                    confirmButtonColor: isDark ? '#6b7280' : '#3b82f6'
                });

                // Actualizamos la lista filtrando el archivo borrado
                setArchivos(archivos.filter((archivo: any) => archivo.id !== fileId));
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al eliminar.',
                    icon: 'error',
                    background: swalBackground,
                    color: swalTextColor,
                    confirmButtonColor: isDark ? '#6b7280' : '#3b82f6'
                });
            }
        }
    };

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
        // Lógica de descarga
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
                {/* Cambié el borde a azul en light mode */}
                <div className="bg-white dark:bg-gray-900 border border-blue-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="p-8 text-center text-gray-500">Cargando tus archivos...</div>
                    ) : archivos.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">No tienes archivos comprimidos aún.</div>
                    ) : (
                        <div className="w-full overflow-x-auto max-h-[550px] overflow-y-auto">
                            <table className="w-full text-left min-w-[750px] border-collapse bg-white dark:bg-gray-900">
                                {/* Encabezado Azul en Light y Gris en Dark */}
                                <thead className="bg-blue-600 text-white dark:bg-gray-800 dark:text-gray-200 text-xs uppercase tracking-wider sticky top-0 z-10">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">Archivo Original</th>
                                        <th className="px-6 py-4 font-semibold">Tamaño Original</th>
                                        <th className="px-6 py-4 font-semibold">Tamaño Optimizado</th>
                                        <th className="px-6 py-4 font-semibold">Reducción</th>
                                        <th className="px-6 py-4 font-semibold">Nivel</th>
                                        <th className="px-6 py-4 font-semibold">Fecha</th>
                                        <th className="px-6 py-4 font-semibold text-right">Acciones</th>
                                    </tr>
                                </thead>
                                {/* Filas Blancas en Light y Gris oscuro en Dark */}
                                <tbody className="divide-y divide-blue-50 dark:divide-gray-800">
                                    {archivos.map((archivo: any) => (
                                        <tr key={archivo.id} className="hover:bg-blue-50 dark:hover:bg-gray-800/50 transition">
                                            <td className="px-6 py-4 flex items-center gap-3">
                                                <div className="p-2 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg shrink-0">
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
                                                {archivo.reductionPercentage ? `${Number(archivo.reductionPercentage).toFixed(1)}%` : "0%"}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className="px-2.5 py-1 bg-blue-100 dark:bg-gray-800 text-blue-800 dark:text-gray-300 rounded-full text-xs font-medium">
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
                                                    <button
                                                        onClick={() => handleDelete(archivo.id)}
                                                        className="p-2 text-gray-400 hover:text-red-600 transition"
                                                        title="Eliminar"
                                                    >
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