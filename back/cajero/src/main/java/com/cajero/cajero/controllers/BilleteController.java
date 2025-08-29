package com.cajero.cajero.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cajero.cajero.dto.BilleteDTO;
import com.cajero.cajero.services.BilleteService;

@RestController //indica que esta clase es un controlador
@RequestMapping("/billetes")//ruta del endpoint
public class BilleteController {
    
    @Autowired // evita usar el contructor para tener una instancia de la clase
    private BilleteService billeteService;

    @GetMapping("")//endpoint para obtener los billetes
    public ResponseEntity<List<BilleteDTO>>listarBilletes() {
        List<BilleteDTO> billetes = billeteService.obtenerBilletes();

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(billetes);
    }

    @GetMapping("/saldo-total")
    public ResponseEntity<Integer> obtenerSaldoTotal(){
        Integer saldoTotal = billeteService.obtenerSaldoTotal();

        return  ResponseEntity.ok(saldoTotal);
    }

    @PostMapping("/añadir")
    public ResponseEntity<BilleteDTO> añadirCantida(@Validated @RequestBody BilleteDTO billeteDTO){
        //obtene el billete actualizado
        BilleteDTO billeteActualizado = billeteService.añadirCantidad(billeteDTO);

        //resonder con el billete y  un estatus de creado
        return  ResponseEntity.status(HttpStatus.CREATED).body(billeteActualizado);
        
    }
    
}
