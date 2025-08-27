import { useEffect, useState } from "react";
import type { Billete } from "../../types/billeteTypes";
import { getBilletesAdmin } from "../../services/billetesServices";

export const AdminBilletes = () => {
  const [billetes, setBilletes] = useState<Billete[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBilletes = async () => {
    setLoading(true);
    const data = await getBilletesAdmin();
    if (data) setBilletes(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBilletes();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-600 mb-4">Billetes del Cajero</h2>

      {loading ? (
        <div className="flex items-center gap-2 mt-2">
          <div className="w-5 h-5 border-4 border-t-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-700">Cargando Billetes...</span>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {billetes.map((b, i) => (
            <div
              key={i}
              className="flex-1 min-w-[150px] max-w-xs border rounded-lg p-4 bg-gray-800 shadow hover:shadow-lg transition duration-300 hover:scale-105"
            >
              <p className="text-lg font-semibold text-blue-500">
                Denominacion: <span className="text-green-600">${b.denominacion}</span>
              </p>
              <p className="text-gray-300">Cantidad: {b.cantidad}</p>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={fetchBilletes}
        className="mt-6 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
      >
        Actualizar
      </button>
    </div>
  );
};
