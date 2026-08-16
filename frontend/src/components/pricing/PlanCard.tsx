import { Check, X } from "lucide-react";

interface Feature {
    name: string;
    included: boolean;
}

interface PricingCardProps {
    title: string;
    description: string;
    price: string;
    features: Feature[];
    buttonText: string;
    isCurrentPlan?: boolean;
    highlightColor?: string; // Para darle el toque 🔵 o 🟣
}

export default function PricingCard({
    title,
    description,
    price,
    features,
    buttonText,
    isCurrentPlan = false,
    highlightColor = "border-gray-200 dark:border-gray-800" // Borde por defecto
}: PricingCardProps) {
    return (
        <div className={`
            bg-white dark:bg-gray-900 
            border-2 ${highlightColor} 
            rounded-2xl p-6 w-full flex flex-col
            transition-all duration-300 hover:-translate-y-1
        `}>
            {/* Encabezado */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm min-h-[40px]">
                {description}
            </p>
            
            {/* Precio */}
            <div className="mt-4 flex items-baseline text-4xl font-extrabold text-gray-900 dark:text-white">
                {price} <span className="text-lg font-medium text-gray-500 ml-1">/mes</span>
            </div>

            {/* Lista de características */}
            <ul className="mt-6 space-y-4 flex-1">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                        {feature.included ? (
                            <Check size={20} className="text-green-500 shrink-0 mt-0.5" />
                        ) : (
                            <X size={20} className="text-gray-400 dark:text-gray-600 shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm ${
                            feature.included 
                                ? "text-gray-700 dark:text-gray-300" 
                                : "text-gray-400 dark:text-gray-600 line-through decoration-gray-300 dark:decoration-gray-700"
                        }`}>
                            {feature.name}
                        </span>
                    </li>
                ))}
            </ul>

            {/* Botón */}
            <button 
                disabled={isCurrentPlan}
                className={`
                    mt-8 w-full font-medium py-2.5 rounded-xl transition
                    ${isCurrentPlan 
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30"
                    }
                `}
            >
                {buttonText}
            </button>
        </div>
    );
}