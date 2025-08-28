import type React from "react";
import { Banknote, Wallet } from "lucide-react";

interface Banco {
  saldoDisponible: number;
}

export const CardSaldo: React.FC<Banco> = ({ saldoDisponible }) => {
  return (
    <div className="bg-gray-800 p-10 rounded-2xl flex flex-col gap-4 items-center shadow-lg border border-white duration-300 hover:scale-105">
      <div className="bg-white/10 p-3 rounded-full">
        <Wallet className="w-10 h-10 text-green-400" />
      </div>

      <h2 className="text-xl font-semibold text-amber-400">
        Saldo disponible
      </h2>

      <p className="text-4xl font-bold text-blue-500 flex items-center gap-2">
        <Banknote className="w-8 h-8 text-green-400" />
        ${saldoDisponible.toLocaleString()}
      </p>
    </div>
  );
};
