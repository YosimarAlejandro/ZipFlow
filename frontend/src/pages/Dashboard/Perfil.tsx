import DashboardLayout from "../../components/layout/DashboardLayout";

// 1. Importamos tu nuevo componente dinámico
import PlanCard from "../../components/pricing/PlanCard";

export default function Perfil() {

  // 2. Aquí metemos los datos de tus tres planes
  const plans = [
    {
      title: "Plan Básico",
      description: "Perfecto para conocer la plataforma y usos esporádicos.",
      price: "$0",
      isCurrentPlan: true,
      buttonText: "Plan Actual",
      features: [
        { name: "3 pruebas gratis / Comprimir", included: true },
        { name: "Formatos JPG, JPEG, PNG, PDF", included: true },
        { name: "Elegir nivel de compresión", included: true },
        { name: "Descargar resultado", included: true },
        { name: "Historial permanente", included: false },
        { name: "Estadísticas avanzadas", included: false },
        { name: "Perfil de usuario", included: false },
        { name: "Configuraciones avanzadas", included: false },
        { name: "Procesamiento masivo", included: false },
        { name: "Prioridad de procesamiento", included: false },
      ]
    },
    {
      title: "Pro 🔵",
      description: "Para freelancers y profesionales que necesitan más poder.",
      price: "$9",
      isCurrentPlan: false,
      buttonText: "Mejorar a Pro",
      highlightColor: "border-blue-500",
      features: [
        { name: "Límite alto de compresiones", included: true },
        { name: "Formatos extendidos", included: true },
        { name: "Historial y su eliminación", included: true },
        { name: "Dashboard completo y Estadísticas", included: true },
        { name: "Perfil de usuario", included: true },
        { name: "Mayor tamaño de archivo", included: true },
        { name: "Mayor prioridad (⚡)", included: true },
        { name: "Procesamiento masivo", included: false },
        { name: "API Access", included: false },
        { name: "Gestión de organización", included: false },
      ]
    },
    {
      title: "Business 🟣",
      description: "Ideal para equipos y empresas con alto volumen.",
      price: "$29",
      isCurrentPlan: false,
      buttonText: "Contactar Ventas",
      highlightColor: "border-purple-500",
      features: [
        { name: "Todo lo del plan Pro", included: true },
        { name: "Usuarios / Equipo (👥)", included: true },
        { name: "Procesamiento masivo (📦)", included: true },
        { name: "Estadísticas avanzadas (📊)", included: true },
        { name: "Prioridad máxima (🚀)", included: true },
        { name: "API Access (🔑)", included: true },
        { name: "Métricas de uso (📈)", included: true },
        { name: "Gestión de organización (🏢)", included: true },
      ]
    }
  ];

  return (
    <DashboardLayout>

      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Información Personal</h2>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-8 items-center">
          {/* Avatar */}
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            JD
          </div>

          {/* Datos */}
          <div className="flex-1 w-full space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 font-medium">Nombre Completo</label>
                <p className="text-gray-900 dark:text-white font-semibold">Juan Developer</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium">Correo Electrónico</label>
                <p className="text-gray-900 dark:text-white font-semibold">juan@zipflow.com</p>
              </div>
            </div>
          </div>

          {/* Botón de acción */}
          <button className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-semibold hover:opacity-90 transition">
            Editar Perfil
          </button>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Sesiones Activas</h2>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
          {/* Dispositivo 1 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">💻</div>
              <div>
                <p className="text-sm font-semibold">Chrome - Windows 11</p>
                <p className="text-xs text-gray-500">Última actividad: Hace 5 minutos</p>
              </div>
            </div>
            <span className="text-xs text-green-500 font-medium">Sesión actual</span>
          </div>
          {/* Dispositivo 2 */}
          <div className="flex justify-between items-center pt-4 border-t dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">📱</div>
              <div>
                <p className="text-sm font-semibold">Safari - iPhone 15</p>
                <p className="text-xs text-gray-500">Última actividad: Hace 2 días</p>
              </div>
            </div>
            <button className="text-xs text-red-500 hover:underline">Cerrar sesión</button>
          </div>
        </div>
      </div>

      {/* Sección de Planes */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Tu Suscripción
        </h2>

        {/* 3. El grid ahora es de 3 columnas en pantallas grandes (lg:grid-cols-3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 4. El map() dibuja una tarjeta por cada plan en el arreglo */}
          {plans.map((plan, index) => (
            <PlanCard
              key={index}
              title={plan.title}
              description={plan.description}
              price={plan.price}
              features={plan.features}
              buttonText={plan.buttonText}
              isCurrentPlan={plan.isCurrentPlan}
              highlightColor={plan.highlightColor}
            />
          ))}
        </div>
      </div>

    </DashboardLayout>
  );
}