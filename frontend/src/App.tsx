import React from 'react';

export default function Login() {
  return (
    /* Contenedor principal: ocupa toda la pantalla, fondo sutil, evita scroll horizontal */
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4 sm:p-8 overflow-x-hidden font-sans">
      
      {/* Tarjeta del Login: Flexible, sombra moderna y bordes redondeados */}
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden box-border">

        {/* LADO IZQUIERDO: Branding (Se oculta en celulares, se muestra en pantallas grandes) */}
        <div className="hidden lg:flex lg:w-1/2 bg-blue-600 p-12 flex-col justify-center items-center text-white relative overflow-hidden">
          <div className="z-10 text-center">
            <h1 className="text-5xl font-extrabold mb-4 tracking-tight">ZipFlow</h1>
            <p className="text-blue-100 text-lg max-w-xs mx-auto">
              Optimiza, comprime y gestiona tus archivos en segundos.
            </p>
          </div>
          
          {/* Elementos decorativos modernos (reemplazan a las olas raras) */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform translate-x-1/2 translate-y-1/2"></div>
        </div>

        {/* LADO DERECHO: Formulario interactivo (Ancho completo en móvil, mitad en escritorio) */}
        <div className="w-full lg:w-1/2 p-8 sm:p-14 flex flex-col justify-center box-border">
          
          {/* Encabezado del formulario */}
          <div className="text-center lg:text-left mb-10">
            {/* Título visible solo en móvil (ya que en escritorio está en el lado azul) */}
            <h2 className="text-3xl font-extrabold text-blue-600 lg:hidden mb-4">ZipFlow</h2>
            <h3 className="text-2xl font-bold text-gray-800">Bienvenido de nuevo</h3>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">Inicia sesión en tu cuenta para continuar</p>
          </div>

          <form className="flex flex-col gap-5 w-full">
            {/* Input Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Correo electrónico</label>
              <input
                type="email"
                placeholder="ejemplo@correo.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all box-border bg-gray-50 focus:bg-white text-gray-800"
              />
            </div>

            {/* Input Contraseña */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Contraseña</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all box-border bg-gray-50 focus:bg-white text-gray-800"
              />
            </div>

            {/* Opciones extra */}
            <div className="flex flex-wrap items-center justify-between mt-2 gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                <span className="text-sm text-gray-600 font-medium">Recordarme</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Botón de Submit */}
            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 text-white font-bold py-3.5 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Iniciar Sesión
            </button>
          </form>

          {/* Footer del Formulario */}
          <p className="mt-8 text-center text-sm text-gray-600">
            ¿No tienes una cuenta? <a href="#" className="text-blue-600 hover:text-blue-800 font-bold hover:underline transition-colors">Regístrate gratis</a>
          </p>
        </div>

      </div>
    </div>
  );
}