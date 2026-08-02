import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "../pages/Welcome/Welcome";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Welcome/Login";

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



</Routes>

</BrowserRouter>

)

}


export default AppRouter;