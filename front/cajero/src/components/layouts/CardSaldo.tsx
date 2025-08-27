import type React from "react";

interface banco {
  saldoDisponible:number;
}

export const CardSaldo: React.FC<banco> = ({saldoDisponible}) => {
  return (
    <div className=" bg-green-700 p-5 rounded-2xl flex flex-col gap-3">
        <h2 className="text-2xl font-bold text-gray-200">Saldo disponible en el cajero</h2>
        <p className="text-4xl font-bold text-amber-300">${saldoDisponible}</p>
    </div>
  )
}
