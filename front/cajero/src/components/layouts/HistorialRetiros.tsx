import { getRetiros } from "../../services/retirosServices";
import type { Retiro } from "../../types/retiroTypes";
import { useState, useEffect } from "react";
import { Retiros } from "./Retiros";
import { History, RotateCcw } from "lucide-react";

export const HistorialRetiros = () => {
  const [retiros, setRetiros] = useState<Retiro[]>([]);
  const [loading, setLoading] = useState(true);

  //funcion para obtener retiros
  const fetchRetiros = async () => {
    setLoading(true);
    try {
      const data = await getRetiros();
      setRetiros(data);
    } catch (error) {
      console.error("Error cargando retiros:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 se llama al montar el componente
  useEffect(() => {
    fetchRetiros();
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 bg-gray-900 p-6 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <History className="text-green-500 w-6 h-6" />
          <h2 className="text-xl font-bold text-green-500">
            Historial de Retiros
          </h2>
        </div>
        <button
          onClick={fetchRetiros}
          className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          <RotateCcw size={18} />
        </button>
      </div>
      {loading ? (
        <div className="flex items-center gap-2 mt-2">
          <div className="w-5 h-5 border-4 border-t-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-400">Cargando Retiros...</span>
        </div>
      ) : (
        <Retiros retiros={retiros} />
      )}
    </div>
  );
};
