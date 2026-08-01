import type { CompressionResponse } from "../types/compression";
import type { CompressionLevel } from "../types/compressionLevel";

const API_URL = "http://localhost:5039/api/files/upload";

export async function uploadFile(
    file: File,
    compressionLevel: CompressionLevel
): Promise<CompressionResponse> {


    console.log("========== FILE SERVICE ==========");
    console.log("Archivo enviado:", file.name);
    console.log("Peso:", file.size);
    console.log("CompressionLevel recibido:", compressionLevel);
    console.log("==================================");


    const formData = new FormData();

    formData.append("file", file);
    formData.append("compressionLevel", compressionLevel);


    console.log("FormData creado");

    console.log("FormData creado");

    formData.forEach((value, key) => {
        console.log(
            "FORMDATA:",
            key,
            value
        );
    });


    const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
    });


    console.log(
        "Status API:",
        response.status
    );


    if (!response.ok) {
        throw new Error("Error al comprimir.");
    }


    const data = await response.json();

    console.log("JSON API:", data);


    return data;
}