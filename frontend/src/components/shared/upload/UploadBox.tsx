import { useRef, useState } from "react";
import type { SelectedFile } from "../../../types/file";
import type { CompressionResponse } from "../../../types/compression";
import type { CompressionLevel } from "../../../types/compressionLevel";
import { uploadFile } from "../../../services/fileService";
import ResultCard from "./../ResultCard";
import FileDropzone from "./FileDropzone";

interface UploadBoxProps {
    result?: CompressionResponse | null;
    onCompressionSuccess?: (response: CompressionResponse) => void; // <-- Debe aceptar el parámetro
}

export default function UploadBox({ onCompressionSuccess }: UploadBoxProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>("medium");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<CompressionResponse | null>(null);

    const processFile = (file: File) => {
        setSelectedFile({
            file,
            name: file.name,
            size: file.size,
            type: file.type,
        });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
            onCompressionSuccess?.(response);
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
                <FileDropzone
                    inputRef={inputRef}
                    selectedFile={selectedFile}
                    isDragging={isDragging}
                    compressionLevel={compressionLevel}
                    loading={loading}
                    onFileChange={handleFileChange}
                    onDrop={handleDrop}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onLevelChange={setCompressionLevel}
                    onRemoveFile={removeFile}
                    onCompress={handleCompress}
                />
            </div>

            {result && (
                <ResultCard
                    result={result}
                />
            )}
        </section>
    );
}