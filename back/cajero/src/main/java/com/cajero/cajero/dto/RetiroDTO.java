package com.cajero.cajero.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data // genera getters y setters
@Builder // genera automáticamente un patrón Builder
public class RetiroDTO {
    private Long id;
    private Integer monto;
    private LocalDateTime fecha;
}

