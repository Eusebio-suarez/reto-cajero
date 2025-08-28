package com.cajero.cajero.services;

import java.util.List;
import java.util.stream.Collectors;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cajero.cajero.dto.RetiroDTO;
import com.cajero.cajero.repository.RetiroRepository;


@Service
public class RetiroService {
    @Autowired//evita usuar directamente el contructor
    private RetiroRepository retiroRepository;
    
    //obtenerlos retiros
    public List<RetiroDTO> obtenerRetiros(){
           return retiroRepository.findAllByOrderByFechaDesc()
                .stream()
                .map(retiro -> RetiroDTO.builder()
                        .monto(retiro.getMonto())
                        .fecha(retiro.getFecha()) 
                        .build())
                .collect(Collectors.toList());
    }

    
        
}