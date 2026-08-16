import type { CompressionLevel } from "../../../types/compressionLevel";

interface CompressionSelectorProps {
    compressionLevel: CompressionLevel;
    onLevelChange: (level: CompressionLevel) => void;
}

export default function CompressionSelector({
    compressionLevel,
    onLevelChange,
}: CompressionSelectorProps) {
    return (
        <div className="mt-6" onClick={(e) => e.stopPropagation()}>
            <label className="block mb-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                Nivel de compresión
            </label>
            
            <div className="relative">
                <select
                    value={compressionLevel}
                    onChange={(e) =>
                        onLevelChange(e.target.value as CompressionLevel)
                    }
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-xs sm:text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-slate-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-700 dark:focus:border-blue-500 cursor-pointer"
                >
                    <option value="low">⚡ Mejor calidad (Mínima pérdida)</option>
                    <option value="medium">⚖️ Balanceado (Recomendado)</option>
                    <option value="high">🚀 Máxima compresión (Archivo más ligero)</option>
                </select>

                {/* Icono de flechita personalizado para que se vea pro */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    );
}