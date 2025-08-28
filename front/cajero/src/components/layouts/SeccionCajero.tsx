import { useState } from "react";
import { Banknote, CircleDollarSign, Keyboard, CheckCircle2 } from "lucide-react";
import swal from "sweetalert";
import { retirarDinero } from "../../services/retirosServices";
import type { Billete } from "../../types/billeteTypes";

export const SeccionCajero = () => {
  const [monto, setMonto] = useState<string | number>("");
  const [loading, setLoading] = useState(false);

  const handleRetiro = (valor: number) => {
    setMonto(valor);
  };

  const confirmarRetiro = async () => {
    const montoNum = typeof monto === "string" ? parseInt(monto) : monto;
    if (!montoNum || isNaN(montoNum) || montoNum <= 0) {
      swal("Advertencia", "Ingrese un valor válido.", "warning");
      return;
    }

    setLoading(true);
    try {
      const billetes: Billete[] = await retirarDinero(montoNum);

      if (billetes.length > 0) {
        const lista = billetes
          .map((b) => `💵 ${b.denominacion.toLocaleString()} x ${b.cantidad}`)
          .join("\n");

        console.log("Billetes entregados:");
        console.table(billetes);

        swal("Billetes entregados", lista, "success");
      } else {
        swal("Sin billetes", "El retiro no generó billetes", "info");
      }
    } catch (error) {
      console.error("Error en retirarDinero:", error);
      swal("Error", "No se pudo procesar el retiro", "error");
    } finally {
      setLoading(false);
      setMonto("");
    }
  };

  return (
    <div className="bg-[#111827] text-white shadow-lg rounded-2xl p-6 mb-6">
      <h2 className="text-green-400 text-xl font-semibold mb-4 flex items-center gap-2">
        <Banknote className="text-green-400 w-6 h-6" /> Cajero Automático
      </h2>
      <div className="flex flex-wrap gap-3 mb-4">
        {[10000, 20000, 50000, 100000, 200000].map((valor) => (
          <button
            key={`btn-${valor}`}
            onClick={() => handleRetiro(valor)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl shadow-md"
          >
            <CircleDollarSign className="w-4 h-4" />
            ${valor.toLocaleString()}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 mb-4">
        <Keyboard className="text-gray-400 w-5 h-5" />
        <input
          type="number"
          placeholder="Monto personalizado"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          className="flex-1 bg-[#1f2937] text-white border border-gray-600 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <button
        onClick={confirmarRetiro}
        disabled={loading}
        className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 disabled:bg-green-800 text-white py-2 px-4 rounded-xl shadow-lg"
      >
        <CheckCircle2 className="w-5 h-5" />
        {loading ? "Procesando..." : "Confirmar Retiro"}
      </button>
    </div>
  );
};
