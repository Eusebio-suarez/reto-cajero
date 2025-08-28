package com.cajero.cajero.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;        // <--- IMPORT CORRECTO
import jakarta.persistence.Table;
import lombok.Data;

@Entity // definir que esta clase es una entidad
@Table(name = "retiros") // nombre de la tabla en la base de datos
@Data // getters y setters con Lombok
public class Retiro {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;   // id BIGINT AUTO_INCREMENT PRIMARY KEY

    @Column(name="monto")
    private Integer monto;   // monto INT NOT NULL

    @Column(name="fecha")
    private LocalDateTime fecha;  // fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
}
