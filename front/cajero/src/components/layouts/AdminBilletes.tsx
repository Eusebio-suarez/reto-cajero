import { useEffect, useState } from "react";
import type { Billete } from "../../types/billeteTypes";
import { getBilletesAdmin } from "../../services/billetesServices";
import { RotateCcw, Banknote, Layers, Calculator } from "lucide-react";

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
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold text-green-600">Billetes del Cajero</h2>
        <button
          onClick={fetchBilletes}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 mt-2">
          <div className="w-5 h-5 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-700">Cargando Billetes...</span>
        </div>
      ) : (
        <div className="flex flex-wrap gap-5">
          {billetes.map((b, i) => {
            const total = b.denominacion * b.cantidad;
            return (
              <div
                key={i}
                className="flex-1 min-w-[200px] max-w-sm border rounded-xl p-5 bg-gray-800 shadow-md hover:shadow-xl transition duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-2 mb-2 text-green-500 font-semibold">
                  <Banknote size={18} />
                  <span>Denominación:</span>
                  <span className="text-blue-500 font-bold">${b.denominacion}</span>
                </div>

                <div className="flex items-center text-orange-500 gap-2 mb-2 font-semibold">
                  <Layers size={18} />
                  <span>Cantidad:</span>
                  <span className="text-gray-300">{b.cantidad}</span>
                </div>

                <div className="flex items-center gap-2 text-amber-400 font-bold text-lg">
                  <Calculator size={18} />
                  <span>Total:</span>
                  <span className="text-blue-500">${total.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
