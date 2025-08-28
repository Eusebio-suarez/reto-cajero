package com.cajero.cajero.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data // genera getters y setters
@Builder // genera automáticamente un patrón Builder
public class RetiroDTO {
    private long id;
    private Integer monto;
    private LocalDateTime fecha;
}

