import DashboardLayout from "../../components/layout/DashboardLayout";
import { Filter,  Trash2, Download, FileText } from "lucide-react";

export default function MisArchivos() {
    // Simulamos una lista de archivos
    const archivos = [
        { id: 1, nombre: "documento_final.pdf", peso: "2.4 MB", fecha: "12 Ago 2026", tipo: "PDF" },
        { id: 2, nombre: "foto_perfil.png", peso: "800 KB", fecha: "10 Ago 2026", tipo: "PNG" },
        { id: 3, nombre: "reporte_ventas.zip", peso: "12 MB", fecha: "08 Ago 2026", tipo: "ZIP" },
    ];

    return (
        <DashboardLayout>
            <div className="max-w-5xl mx-auto pb-10">
                {/* Header de la sección */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mis Archivos</h1>
                        <p className="text-sm text-gray-500">Gestiona tus archivos comprimidos.</p>
                    </div>
                    
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-medium hover:bg-gray-50 transition">
                            <Filter size={16} /> Filtrar
                        </button>
                    </div>
                </div>

                {/* Tabla de archivos */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-950 text-gray-500 text-xs uppercase">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Nombre</th>
                                <th className="px-6 py-4 font-semibold">Tipo</th>
                                <th className="px-6 py-4 font-semibold">Tamaño</th>
                                <th className="px-6 py-4 font-semibold">Fecha</th>
                                <th className="px-6 py-4 font-semibold text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {archivos.map((archivo) => (
                                <tr key={archivo.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <div className="p-2 bg-blue-50 dark:bg-blue-950 text-blue-600 rounded-lg">
                                            <FileText size={18} />
                                        </div>
                                        <span className="font-medium text-gray-900 dark:text-white text-sm">{archivo.nombre}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{archivo.tipo}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{archivo.peso}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{archivo.fecha}</td>
                                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                                        <button className="p-2 text-gray-400 hover:text-blue-600 transition"><Download size={18} /></button>
                                        <button className="p-2 text-gray-400 hover:text-red-600 transition"><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}