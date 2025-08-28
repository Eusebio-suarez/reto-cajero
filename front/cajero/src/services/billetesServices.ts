import type { Billete } from "../types/billeteTypes";

// consumir el endpoint del saldo
export const getSaldoTotal = async (): Promise<number | null> => {
  try {
    const response = await fetch("http://localhost:8080/billetes/saldo-total");
    if (!response.ok) throw new Error("Error al obtener el saldo");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

//consumir el endpoint para obtener todos los billetes
export const getBilletesAdmin = async (): Promise<Billete[] | null> => {
  try {
    const res = await fetch("http://localhost:8080/billetes");
    if (!res.ok) throw new Error("Error al obtener billetes");
    const data: Billete[] = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const realizarRetiroApi = async (monto: number): Promise<Billete[]> => {
  try {
    const response = await fetch(`http://localhost:8080/retiros/retirar?monto=${monto}`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const billetes: Billete[] = await response.json();
    return billetes;
  } catch (error) {
    console.error("Error en retiro:", error);
    return [];
  }
};

