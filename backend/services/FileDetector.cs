namespace backend.Services
{
    public static class FileDetector
    {
        public static async Task<string> DetectAsync(
            string filePath,
            string compression = "medium")
        {
            var extension = Path.GetExtension(filePath).ToLower();

            switch (extension)
            {
                case ".jpg":
                case ".jpeg":
                case ".png":
                    return await ImageOptimizer.OptimizeAsync(
                        filePath,
                        compression);

                case ".pdf":
                    return await PdfOptimizer.OptimizeAsync(
                        filePath,
                        compression);

                default:
                    throw new Exception("Formato no soportado.");
            }
        }
    }
}