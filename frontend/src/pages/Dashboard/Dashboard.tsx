import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import UploadBox from "../../components/shared/upload/UploadBox"; 
import type { CompressionResponse } from "../../types/compression";

export default function Dashboard() {
    const [result, setResult] = useState<CompressionResponse | null>(null);
    
    // Estado para llevar el control de los intentos (Arranca en 1 de 3)
    const [compressionsUsed, setCompressionsUsed] = useState<number>(1);
    const maxCompressions = 3;

    // Función que recibe correctamente el parámetro CompressionResponse
    const handleCompressionComplete = (response: CompressionResponse) => {
        setResult(response);
        if (compressionsUsed < maxCompressions) {
            setCompressionsUsed((prev) => prev + 1);
        }
    };

    const progressPercentage = (compressionsUsed / maxCompressions) * 100;

    return (
        <DashboardLayout>
            <div className="mx-auto max-w-5xl px-4 py-6 sm:py-8">
                {/* Header Profesional */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Inicio
                    </h1>
                    <p className="mt-1 sm:mt-2 text-sm sm:text-base text-slate-500 dark:text-slate-400">
                        Optimiza tus imágenes al instante. Mantén tu flujo de trabajo ligero y rápido.
                    </p>
                </div>

                {/* Grid Responsivo */}
                <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
                    
                    {/* Columna Principal */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Caja de subir archivo más compacta en móviles (p-4 en lugar de p-8) */}
                        <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <h2 className="mb-4 sm:mb-6 text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                                Subir nuevo archivo
                            </h2>
                            <UploadBox 
                                result={result} 
                                onCompressionSuccess={handleCompressionComplete} 
                            />
                        </div>

                       
                    </div>

                    {/* Columna Lateral / Sidebar */}
                    <div className="space-y-6">
                        {/* Widget de Estatus en tono AZUL como lo solicitaste */}
                        <div className="rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 shadow-xl dark:border-blue-500/30 dark:from-blue-950 dark:to-slate-900">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-white">Tu plan actual</h3>
                                <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold text-white">
                                    Gratis
                                </span>
                            </div>
                            
                            {/* Contador dinámico */}
                            <p className="mb-4 text-sm text-blue-100 dark:text-blue-200">
                                {compressionsUsed} de {maxCompressions} compresiones usadas
                            </p>
                            
                            {/* Barra de progreso dinámica */}
                            <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-blue-900/50 dark:bg-slate-800">
                                <div 
                                    className="h-full rounded-full bg-white dark:bg-blue-400 transition-all duration-500" 
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>

                            <button className="w-full bg-green-600 rounded-xl py-2.5 text-xs font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg">
                                Mejorar a Pro 🚀
                            </button>
                        </div>

                        {/* Tips Pro */}
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/50">
                            <h3 className="mb-2 font-bold text-slate-900 dark:text-white">💡 Tip Pro</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Los archivos comprimidos con el plan Pro mantienen una calidad superior y se procesan 3x más rápido.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
}