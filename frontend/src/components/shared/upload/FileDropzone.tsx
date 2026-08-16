import type { SelectedFile } from "../../../types/file";
import type { CompressionLevel } from "../../../types/compressionLevel";
import CompressionSelector from "./CompressionSelector";

interface FileDropzoneProps {
    inputRef: React.RefObject<HTMLInputElement | null>;
    selectedFile: SelectedFile | null;
    isDragging: boolean;
    compressionLevel: CompressionLevel;
    loading: boolean;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave: () => void;
    onLevelChange: (level: CompressionLevel) => void;
    onRemoveFile: () => void;
    onCompress: () => void;
}

export default function FileDropzone({
    inputRef,
    selectedFile,
    isDragging,
    compressionLevel,
    loading,
    onFileChange,
    onDrop,
    onDragOver,
    onDragLeave,
    onLevelChange,
    onRemoveFile,
    onCompress,
}: FileDropzoneProps) {
    return (
        <>
            <input
                ref={inputRef}
                type="file"
                className="hidden"
                onChange={onFileChange}
            />

            <div
                onClick={() => inputRef.current?.click()}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={`
                    cursor-pointer
                    rounded-3xl
                    border-2
                    border-dashed
                    p-8 sm:p-12
                    transition-all
                    duration-300
                    text-center
                    shadow-lg
                    ${isDragging
                        ? "border-blue-600 bg-blue-50/80 scale-[1.02] dark:border-blue-500 dark:bg-blue-950/40"
                        : "border-slate-300 bg-white hover:border-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500"
                    }
                `}
            >
                {!selectedFile ? (
                    <>
                        <div
                            className={`
                                mx-auto
                                mb-6 sm:mb-8
                                flex
                                h-20 w-20 sm:h-24 sm:w-24
                                items-center
                                justify-center
                                rounded-full
                                text-4xl sm:text-5xl
                                transition-all
                                duration-300
                                ${isDragging
                                    ? "bg-blue-600 text-white scale-110 dark:bg-blue-500"
                                    : "bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400"
                                }
                            `}
                        >
                            {isDragging ? "⬇️" : "📂"}
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">
                            {isDragging ? "Suelta tu archivo aquí" : "Arrastra tu archivo aquí"}
                        </h2>

                        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-500 dark:text-slate-400">
                            o haz clic para seleccionarlo
                        </p>

                        <div className="mt-6 sm:mt-8 flex justify-center gap-2 sm:gap-3 flex-wrap">
                            <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">PDF</span>
                            <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">JPG</span>
                            <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">PNG</span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="mx-auto mb-5 sm:mb-6 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-950/60 text-4xl sm:text-5xl text-green-600 dark:text-green-400">
                            📄
                        </div>

                        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 break-all px-4">
                            {selectedFile.name}
                        </h2>

                        <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>

                        <div className="mt-3 max-w-md mx-auto">
                            <span className="inline-block rounded-full bg-green-100 dark:bg-green-950/50 px-4 py-1.5 text-xs sm:text-sm font-semibold text-green-700 dark:text-green-300 border border-green-200 dark:border-green-900">
                                ✔ Archivo listo para comprimir
                            </span>

                            <CompressionSelector
                                compressionLevel={compressionLevel}
                                onLevelChange={onLevelChange}
                            />
                        </div>

                        <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    inputRef.current?.click();
                                }}
                                className="rounded-xl bg-slate-200 dark:bg-slate-800 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                            >
                                Cambiar archivo
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemoveFile();
                                }}
                                className="rounded-xl bg-red-600 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white hover:bg-red-700 transition-colors shadow-sm shadow-red-600/20"
                            >
                                Eliminar
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onCompress();
                                }}
                                disabled={loading}
                                className="rounded-xl bg-blue-600 px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-slate-400 dark:disabled:bg-slate-800 disabled:cursor-not-allowed transition-colors shadow-sm shadow-blue-600/20"
                            >
                                {loading ? "Comprimiendo..." : "Comprimir archivo"}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}