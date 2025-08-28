package com.cajero.cajero.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cajero.cajero.dto.RetiroDTO;
import com.cajero.cajero.services.RetiroService;

@RestController // indicar que la calsees un controllador
@RequestMapping("/retiros") // ruta principal del endpoint
public class RetiroController {
    
    @Autowired // evita usar el contructor directamente
    private RetiroService retiroService;

    @GetMapping("")
    public ResponseEntity<List<RetiroDTO>> listarRetiros(){
        List<RetiroDTO> retiros = retiroService.obtenerRetiros();

        return ResponseEntity.ok(retiros);
    }
}
