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

//recaragr billetes
export const recargarBilletes = async(denominacion:number,cantidad:number) =>{
  try{
    //hacer la peticion para
    const response = await fetch("http://localhost:8080/billetes/agregar",{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        denominacion: denominacion,
        cantidad: cantidad
      })
    })

    //validar que la respuesta este bien
    if(!response.ok){
      swal("Error","No se pudo recargar los billetes","error")
      return
    }
    //convertir la data en json
    const data = await response.json()

    console.log(data);
    

    //informar que fue exitoso el proyecto
    swal("Exito",`Ahora hay ${data.cantidad} disponibles.`,"success")
  }

  catch(error){
    //manejo de errores
    swal("Error", "No se pudo recargar los billetes", error instanceof Error? error.message:"no se pudo agregar billetes error desconocido","error");
  }
} 

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

