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
