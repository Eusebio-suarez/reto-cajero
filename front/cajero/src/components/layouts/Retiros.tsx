import type { Retiro } from "../../types/retiroTypes";
import { Landmark, Calendar } from "lucide-react";

interface Retiros {
  retiros: Retiro[];
}

export const Retiros = ({ retiros }: Retiros) => {
  if (!retiros || retiros.length === 0) {
    return <p className="text-gray-400">No hay retiros registrados.</p>;
  }

  // Funcion para formatear la fecha que se trae de la base de datos
  const formatFecha = (fechaIso: string) => {
    const fecha = new Date(fechaIso);
    return fecha.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <ul className="space-y-3">
      {retiros.map((retiro) => (
        <li
          key={retiro.id}
          className="flex justify-between items-center p-4 bg-gray-800 rounded-xl text-white shadow-md hover:shadow-blue-500/20 hover:scale-[1.01] transition-transform"
        >
          <div className="flex items-center gap-2 text-gray-300">
            <Landmark className="w-4 h-4 text-green-400" />
            <span className="font-medium text-gray-300">ID: {retiro.id}</span>
          </div>
          <div className="">
            <span className="text-blue-400 font-bold text-lg">
              ${retiro.monto.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{formatFecha(retiro.fecha)}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};
