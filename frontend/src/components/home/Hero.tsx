import logo from "../../assets/img/Logo.jpeg";

export default function Hero() {
    return (

        <section className="px-6 py-20">

            <div className="max-w-6xl mx-auto text-center">

                <img
                    src={logo}
                    alt="ZipFlow"
                    className="w-36 mx-auto mb-8 rounded-2xl shadow-lg"
                />

                <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800">
                    Comprime tus archivos
                </h1>

                <h2 className="text-5xl md:text-6xl font-extrabold text-blue-600 mt-2">
                    en segundos
                </h2>

                <p className="mt-8 text-xl text-slate-600 max-w-3xl mx-auto">
                    Reduce el tamaño de PDFs, imágenes y documentos sin perder calidad.
                    Rápido, seguro y completamente desde tu navegador.
                </p>

            </div>

        </section>

    );
}