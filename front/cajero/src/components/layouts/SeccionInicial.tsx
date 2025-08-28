import { Banknote, LogIn } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export const SeccionInicial = () => {
  return (
    <section className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center text-white p-6">
        
        <div className="bg-white/10 p-6 rounded-full shadow-xl mb-6 ">
          <Banknote className="w-20 h-20 text-green-400" />
        </div>
        <h1 className="text-4xl font-extrabold mb-4 text-white drop-shadow-md">
          Bienvenido al Cajero Virtual
        </h1>
        <p className="text-lg text-gray-300 max-w-md text-center mb-8">
          Administra tu dinero de forma rapida y segura.
        </p>
            <NavLink
          to="/cajero"
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:bg-blue-700 transition-all duration-300 "
        >
          <LogIn className="w-5 h-5" />
          Ingresar al Cajero
        </NavLink>
      </div>
    </section>
  )
}

