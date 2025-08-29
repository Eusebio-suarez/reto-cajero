package com.cajero.cajero.services;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cajero.cajero.dto.BilleteDTO;
import com.cajero.cajero.entity.Billete;
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

    // este metodo sirve para actualizar la cantidad de billetes
    public BilleteDTO añadirCantidad(BilleteDTO billeteDTO){

        if(billeteDTO.getDenominacion() == null|| billeteDTO.getCantidad()==null){
            throw new IllegalArgumentException("la denominacio y la cantidad son obligatorias");
        }

        if(billeteDTO.getCantidad()< 0){
            throw new IllegalArgumentException("la cantidad debe ser mayor o igual a 0");
        }

        if(!billeteRepository.existsById(billeteDTO.getDenominacion())){
            throw new  IllegalStateException("el billete no exixste en la base de datos.");
        }

        //buscar el billete que se quiere actualizar
        Billete billeteActual = billeteRepository.findById(billeteDTO.getDenominacion())
            .orElseThrow(()-> new RuntimeException("billete no encontrado"));

        //agregar la cantidad
        billeteActual.setCantidad(billeteActual.getCantidad()+billeteDTO.getCantidad());
        
        //guardar en la base datos
        Billete billeteActulizado = billeteRepository.save(billeteActual);

        //retornar la informacion
        return BilleteDTO.builder()//inicia el contructor para setear los datos
            .denominacion(billeteActulizado.getDenominacion())
            .cantidad(billeteActulizado.getCantidad())
            .build();//devuelve la instancia del objeto

    }
}


