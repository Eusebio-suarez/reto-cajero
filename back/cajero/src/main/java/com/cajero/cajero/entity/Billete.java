package com.cajero.cajero.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity //definir qwue es una entidad
@Table (name="billetes") // nombre de la tabla en la base de datos
@Data // incluye getter, setter, toString y demas metodos
public class Billete {

    @Id //llave primaria
    private Integer denominacion;

    @Column(name = "cantidad")
    private Integer cantidad;
    
}
