import DashboardLayout from "../../components/layout/DashboardLayout";
import { Mail, Send, MessageSquare} from "lucide-react";

export default function Contacto() {
    return (
        <DashboardLayout>
            <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Contacto y Soporte</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
                ¿Tienes algún problema comprimiendo tus archivos o sugerencia para ZipFlow? Escríbenos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Información rápida */}
                <div className="space-y-6 md:col-span-1">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-50 dark:bg-blue-950/50 text-blue-600 rounded-xl">
                            <Mail size={20} />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Correo</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">soporte@zipflow.com</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-50 dark:bg-blue-950/50 text-blue-600 rounded-xl">
                            <MessageSquare size={20} />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Chat en vivo</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Lun - Vie (9am - 6pm)</p>
                        </div>
                    </div>
                </div>

                {/* Formulario de contacto */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm md:col-span-2">
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
                            <input 
                                type="text" 
                                placeholder="Tu nombre" 
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-white text-sm focus:outline-none focus:border-blue-600"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Correo electrónico</label>
                            <input 
                                type="email" 
                                placeholder="tu@correo.com" 
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-white text-sm focus:outline-none focus:border-blue-600"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Mensaje</label>
                            <textarea 
                                rows={4}
                                placeholder="¿En qué podemos ayudarte?" 
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-white text-sm focus:outline-none focus:border-blue-600 resize-none"
                            ></textarea>
                        </div>
                        <button 
                            type="submit"
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-sm"
                        >
                            <Send size={16} /> Enviar mensaje
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </DashboardLayout>
    );
}