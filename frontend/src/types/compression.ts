export interface CompressionResponse {
    message: string;
    compressionLevel: string;

    originalFile: string;
    originalSizeMB: number;

    optimizedFile: string;
    optimizedSizeMB: number;

    reductionPercentage: number;
}