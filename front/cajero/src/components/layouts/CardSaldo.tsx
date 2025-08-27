import type React from "react";

interface banco {
  saldoDisponible:number;
}

export const CardSaldo: React.FC<banco> = ({saldoDisponible}) => {
  return (
    <div className=" bg-green-600 p-5 rounded-2xl flex flex-col gap-3">
        <h2 className="text-2xl font-bold text-gray-300">Saldo disponible en el cajero</h2>
        <p className="text-4xl font-bold text-blue-900">${saldoDisponible}</p>
    </div>
  )
}
