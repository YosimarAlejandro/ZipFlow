import DashboardLayout from "../../components/layout/DashboardLayout";
import {  Bell, Paintbrush, FileText, Save } from "lucide-react";

export default function Configuracion() {
    return (
        <DashboardLayout>
            <div className="max-w-3xl mx-auto pb-20">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Configuración</h1>

                {/* Sección Apariencia */}
                <SettingSection icon={<Paintbrush size={20} />} title="Apariencia">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm font-medium">Tema visual</p>
                            <p className="text-xs text-gray-500">Cambia entre modo claro u oscuro.</p>
                        </div>
                        <select className="bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2 text-sm">
                            <option>Sistema</option>
                            <option>Claro</option>
                            <option>Oscuro</option>
                        </select>
                    </div>
                </SettingSection>

                {/* Sección Notificaciones */}
                <SettingSection icon={<Bell size={20} />} title="Notificaciones">
                    <div className="space-y-4">
                        <ToggleOption title="Alertas de procesamiento" description="Recibir aviso al terminar una compresión." />
                        <ToggleOption title="Novedades de ZipFlow" description="Enterarte de nuevas funciones primero." />
                    </div>
                </SettingSection>

                {/* Sección Preferencias de Compresión */}
                <SettingSection icon={<FileText size={20} />} title="Preferencias de Archivos">
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium mb-1 block">Calidad de salida</label>
                            <select className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-2.5 text-sm">
                                <option>Equilibrado (Recomendado)</option>
                                <option>Alta compresión</option>
                                <option>Calidad máxima</option>
                            </select>
                        </div>
                        <ToggleOption title="Borrado automático" description="Eliminar archivos tras 24 horas en el historial." />
                    </div>
                </SettingSection>

                {/* Botón Guardar */}
                <div className="flex justify-end mt-6">
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition">
                        <Save size={18} /> Guardar cambios
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
}

// Componentes auxiliares para no repetir código
function SettingSection({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) {
    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex items-center gap-2 mb-4 text-blue-600 dark:text-blue-500">
                {icon}
                <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
            </div>
            {children}
        </div>
    );
}

function ToggleOption({ title, description }: { title: string, description: string }) {
    return (
        <div className="flex justify-between items-center">
            <div>
                <p className="text-sm font-medium">{title}</p>
                <p className="text-xs text-gray-500">{description}</p>
            </div>
            <input type="checkbox" className="w-10 h-6 bg-gray-200 rounded-full appearance-none cursor-pointer checked:bg-blue-600 transition-colors relative after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:w-4 after:h-4 after:rounded-full checked:after:translate-x-4 transition-all" />
        </div>
    );
}