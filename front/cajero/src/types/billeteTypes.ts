export interface Billete {
  denominacion: number;
  cantidad: number;
}

export interface RespuestaRetiro {
  billetes: Billete[];
}