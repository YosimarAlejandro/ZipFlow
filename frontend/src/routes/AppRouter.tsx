import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "../pages/Welcome/Welcome";
import Dashboard from "../pages/Dashboard/Dashboard";
import Perfil from "../pages/Dashboard/Perfil";
import Login from "../pages/Welcome/Login";
import Register from "../pages/Welcome/Register";
import Contacto from "../pages/Dashboard/Contacto";
import Configuracion from "../pages/Dashboard/Configuracion";
import Archivos from "../pages/Dashboard/MisArchivos";

const AppRouter = () => {


return (

<BrowserRouter>

<Routes>


<Route 
path="/" 
element={<Welcome />}
/>


<Route 
path="/dashboard" 
element={<Dashboard />}
/>

<Route 
path="/login" 
element={<Login />}
/>

<Route 
path="/register" 
element={<Register />}
/>

<Route 
path="/perfil" 
element={<Perfil />}
/>

<Route
path="/contacto" 
element={<Contacto />}
/>

<Route
path="/configuracion" 
element={<Configuracion />}
/>

<Route
path="/archivos" 
element={<Archivos />}
/>

</Routes>

</BrowserRouter>

)

}


export default AppRouter;