import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "../pages/Welcome/Welcome";
import Dashboard from "../pages/Dashboard/Dashboard";
import Perfil from "../pages/Dashboard/Perfil";
import Login from "../pages/Welcome/Login";
import Register from "../pages/Welcome/Register";
import Contacto from "../pages/Dashboard/Contacto";
import Configuracion from "../pages/Dashboard/Configuracion";
import Archivos from "../pages/Dashboard/MisArchivos";

// 1. Importas tu componente protector
import ProtectedRoute from "./ProtectedRoute"; 

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Rutas Públicas (Cualquiera puede entrar) --- */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* --- Rutas Protegidas (Exigen Token) --- */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/configuracion" element={<Configuracion />} />
          <Route path="/archivos" element={<Archivos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;