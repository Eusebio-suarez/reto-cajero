package com.cajero.cajero.dto;
import lombok.Builder;
import lombok.Data;


@Data //geters y setters
@Builder //genera automáticamente un patrón Builder 
public class BilleteDTO {
    private Integer denominacion;
    private Integer cantidad;
}
