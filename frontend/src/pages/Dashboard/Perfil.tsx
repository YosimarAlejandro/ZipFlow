import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PlanCard from "../../components/pricing/PlanCard";
import Swal from 'sweetalert2';

export default function Perfil() {

 const [user, setUser] = useState<any>(null); // Inicia en null para saber si ya cargó

// 1. Cargar datos con logs para depurar
useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5039/api/users/me", {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Datos recibidos:", data);
          setUser(data); // Guardamos el objeto directo
        }
      } catch (error) {
        console.error("Error al cargar perfil", error);
      }
    };
    fetchUser();
  }, []);

  // Lógica para editar nombre
  const handleEdit = async () => {
    const { value: newName } = await Swal.fire({
      title: 'Editar Nombre',
      input: 'text',
      inputValue: user.Name,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    });

    if (newName && newName !== user.Name) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5039/api/users/me", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ Name: newName })
        });

        if (response.ok) {
          setUser({ ...user, Name: newName });
          Swal.fire('¡Éxito!', 'Nombre actualizado correctamente', 'success');
        }
      } catch (error) {
        Swal.fire('Error', 'No se pudo actualizar', 'error');
      }
    }
  };

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

{/* Avatar dinámico */}
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user?.name ? user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() : "YA"}
          </div>

          <div className="flex-1 w-full space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 font-medium">Nombre Completo</label>
                <p className="text-gray-900 dark:text-white font-semibold">
                  {user ? user.name : "Cargando..."}
                </p>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium">Correo Electrónico</label>
                <p className="text-gray-900 dark:text-white font-semibold">
                  {user ? user.email : "Cargando..."}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={handleEdit}
            className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-semibold hover:opacity-90 transition"
          >
            Editar Perfil
          </button>
        </div>
      </div>

      {/* ... resto de tu código (Sesiones y Planes) ... */}
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