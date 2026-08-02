import { useRef, useState } from "react";
import type { SelectedFile } from "../../types/file";
import type { CompressionResponse } from "../../types/compression";
import type { CompressionLevel } from "../../types/compressionLevel";
import { uploadFile } from "../../services/fileService";
import ResultCard from "./ResultCard";

interface UploadBoxProps {
    onCompressionSuccess?: () => void;
}

export default function UploadBox({

    onCompressionSuccess

}: UploadBoxProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [compressionLevel, setCompressionLevel] =
        useState<CompressionLevel>("medium");

    const [loading, setLoading] = useState(false);

    const [result, setResult] =
        useState<CompressionResponse | null>(null);


    const processFile = (file: File) => {
        setSelectedFile({
            file,
            name: file.name,
            size: file.size,
            type: file.type,
        });
    };

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        processFile(file);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        setIsDragging(false);

        const file = event.dataTransfer.files[0];

        if (!file) return;

        processFile(file);
    };

    const removeFile = () => {
        setSelectedFile(null);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };
    const handleCompress = async () => {

        if (!selectedFile) return;

        try {

            console.log("========== ZIPFLOW FRONTEND ==========");
            console.log("Archivo:", selectedFile.name);
            console.log("Nivel seleccionado:", compressionLevel);
            console.log("======================================");

            setLoading(true);

            const response = await uploadFile(
                selectedFile.file,
                compressionLevel
            );

            console.log("Respuesta API:", response);

            setResult(response);
            onCompressionSuccess?.();
        } catch (error) {

            console.error("ERROR FRONTEND:", error);

            alert("Ocurrió un error al comprimir.");

        } finally {

            setLoading(false);

        }

    };

    return (
        <section className="px-6 pb-24">

            <div className="mx-auto max-w-4xl">

                <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                />

                <div
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={`
                        cursor-pointer
                        rounded-3xl
                        border-2
                        border-dashed
                        p-12
                        transition-all
                        duration-300
                        text-center
                        shadow-lg

                        ${isDragging
                            ? "border-blue-600 bg-blue-50 scale-[1.02]"
                            : "border-slate-300 bg-white hover:border-blue-500"
                        }
                    `}
                >

                    {!selectedFile ? (

                        <>
                            <div
                                className={`
                                    mx-auto
                                    mb-8
                                    flex
                                    h-24
                                    w-24
                                    items-center
                                    justify-center
                                    rounded-full
                                    text-5xl
                                    transition-all
                                    duration-300

                                    ${isDragging
                                        ? "bg-blue-600 text-white scale-110"
                                        : "bg-blue-100"
                                    }
                                `}
                            >
                                {isDragging ? "⬇️" : "📂"}
                            </div>

                            <h2 className="text-3xl font-bold text-slate-800">
                                {
                                    isDragging
                                        ? "Suelta tu archivo aquí"
                                        : "Arrastra tu archivo aquí"
                                }
                            </h2>

                            <p className="mt-4 text-slate-500">
                                o haz clic para seleccionarlo
                            </p>

                            <div className="mt-8 flex justify-center gap-3 flex-wrap">

                                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm">
                                    PDF
                                </span>

                                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm">
                                    JPG
                                </span>

                                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm">
                                    PNG
                                </span>

                            </div>

                        </>

                    ) : (

                        <>

                            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-5xl">

                                📄

                            </div>

                            <h2 className="text-2xl font-bold text-slate-800">

                                {selectedFile.name}

                            </h2>

                            <p className="mt-3 text-slate-500">

                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB

                            </p>

                            <div className="mt-3">

                                <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

                                    ✔ Archivo listo para comprimir

                                </span>
                                <div className="mt-6">

                                    <label className="block mb-2 font-semibold text-slate-700">

                                        Nivel de compresión

                                    </label>

                                    <select
                                        value={compressionLevel}
                                        onClick={(e) => e.stopPropagation()}
                                        onChange={(e) =>
                                            setCompressionLevel(
                                                e.target.value as CompressionLevel
                                            )
                                        }
                                        className="rounded-xl border border-slate-300 px-4 py-3"
                                    >

                                        <option value="low">
                                            Mejor calidad
                                        </option>

                                        <option value="medium">
                                            Balanceado
                                        </option>

                                        <option value="high">
                                            Máxima compresión
                                        </option>

                                    </select>

                                </div>
                            </div>

                            <div className="mt-10 flex flex-wrap justify-center gap-4">

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        inputRef.current?.click();
                                    }}
                                    className="rounded-xl bg-slate-200 px-6 py-3 font-semibold hover:bg-slate-300"
                                >
                                    Cambiar archivo
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFile();
                                    }}
                                    className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
                                >
                                    Eliminar
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCompress();
                                    }}
                                    disabled={loading}
                                    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
                                >
                                    {loading
                                        ? "Comprimiendo..."
                                        : "Comprimir archivo"}
                                </button>

                            </div>

                        </>

                    )}

                </div>

            </div>
            {result && (
                <ResultCard
                    result={result}
                />
            )}

        </section>
    );
}