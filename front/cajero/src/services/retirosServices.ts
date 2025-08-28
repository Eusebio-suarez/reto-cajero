import type { Billete } from "../types/billeteTypes";
import type { Retiro } from "../types/retiroTypes";

export const getRetiros = async (): Promise<Retiro[]> => {
  try {
    const response = await fetch("http://localhost:8080/retiros");
    if (!response.ok) {
      throw new Error("Error al obtener los retiros");
    }
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};

export const retirarDinero = async (monto: number): Promise<Billete[]> => {
  const response = await fetch(`http://localhost:8080/retiros/retirar?monto=${monto}`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error en la petición");
  }

  const data = await response.json();
  console.log("Respuesta del backend:", data);

  let billetes: Billete[] = [];

  if (Array.isArray(data)) {
    billetes = data;
  } else if (typeof data === "object" && data !== null) {
    billetes = Object.entries(data).map(([denominacion, cantidad]) => ({
      denominacion: parseInt(denominacion),
      cantidad: cantidad as number,
    }));
  }

  return billetes;
};
