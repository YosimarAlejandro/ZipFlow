import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");

  // Si no hay token, redirige al login; si sí hay, muestra la ruta (Outlet)
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}