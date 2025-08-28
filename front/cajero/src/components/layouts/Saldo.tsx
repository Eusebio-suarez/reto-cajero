import { useState, useEffect } from "react";
import { CardSaldo } from "./CardSaldo";
import { getSaldoTotal } from "../../services/billetesServices";
import { RotateCcw } from "lucide-react";
export const Saldo = () => {
  const [saldo, setSaldo] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  //hacer la peticion al back y cmabiar el estado
  const fetchSaldo = async () => {
    setLoading(true);
    const data = await getSaldoTotal();
    if (data !== null) setSaldo(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSaldo();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <CardSaldo saldoDisponible={loading ? 0 : saldo ?? 0} />
      <button
        onClick={fetchSaldo}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        <RotateCcw size={18}/>
      </button>

      {loading && (
        <div className="flex items-center gap-2 mt-2">
          <div className="w-5 h-5 border-4 border-t-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-700">Cargando saldo...</span>
        </div>
      )}
    </div>
  );
};

