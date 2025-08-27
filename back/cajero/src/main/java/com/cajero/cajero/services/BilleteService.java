package com.cajero.cajero.services;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cajero.cajero.dto.BilleteDTO;
import com.cajero.cajero.repository.BilleteRepository;


@Service //intica que la clase es un servicio
public class BilleteService {
    @Autowired // evita usar el contructor
    private BilleteRepository billeteRepository;

    //metodo que retorna todos los billetes
    public List<BilleteDTO> obtenerBilletes (){
        return billeteRepository.findAll()
                    .stream()
                    .map(billete -> BilleteDTO.builder()
                            .denominacion(billete.getDenominacion())
                            .cantidad(billete.getCantidad())
                            .build())
                    .collect(Collectors.toList());
    }

    //calcular la suma total de lo billetes
    public Integer obtenerSaldoTotal() {
        return billeteRepository.findAll()
            .stream()
            .mapToInt(billete -> billete.getDenominacion() * billete.getCantidad())
            .sum();
    }
}


