package com.cajero.cajero.services;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cajero.cajero.dto.RetiroDTO;
import com.cajero.cajero.entity.Billete;
import com.cajero.cajero.entity.Retiro;
import com.cajero.cajero.repository.BilleteRepository;
import com.cajero.cajero.repository.RetiroRepository;


@Service
public class RetiroService {
    @Autowired//evita usuar directamente el contructor
    private RetiroRepository retiroRepository;

    @Autowired
    private BilleteRepository billeteRepository;
    
    //obtenerlos retiros
    public List<RetiroDTO> obtenerRetiros(){
            return retiroRepository.findAllByOrderByFechaDesc()
                .stream()
                .map(retiro -> RetiroDTO.builder()
                        .id(retiro.getId())
                        .monto(retiro.getMonto())
                        .fecha(retiro.getFecha()) 
                        .build())
                .collect(Collectors.toList());
    }

    //calcular retiro
    public Map<Integer,Integer> procesarRetiro(Integer monto){

        //validar que el monto no este vacio o sea menor igual que cero
        if (monto == null || monto <= 0) {
            throw new IllegalArgumentException("El monto debe ser mayor a cero");
        }

        // solo permite retirar multiplos de 10000
        if (monto % 10000 != 0) {
            throw new IllegalArgumentException("Solo se pueden retirar montos multiplos de $10,000");
        }

        //buscar los billetes disponibles
        List<Billete> billetesDisponibles = billeteRepository.findAllByOrderByDenominacionDesc();

        //mapa para los billetes usados
        Map<Integer, Integer> billetesPorDenominacion = new HashMap<>();

        int montoRestante = monto;

        //monto restante
        for (Billete billete : billetesDisponibles) {
            // validar que el monto restante sea mayor a la denominacion del billete
            //validar que si temga cantidad
            if(monto>= billete.getDenominacion() && billete.getCantidad() > 0){
                
                //esto devuelve vuantas veces cabe la denominacion de el billete dentro de el monto
                int cantidadUsar = Math.min(montoRestante / billete.getDenominacion(), billete.getCantidad());

                // Si se va a usar al menos un billete se guarda el billete ,la canatida y se resta el monto
                if (cantidadUsar > 0) {
                    // se guarda en el mapa la cantidad de billetes de esta denominación que vamos a entregar
                    billetesPorDenominacion.put(billete.getDenominacion(), cantidadUsar);
                    
                    // al monto restante se le resta el dinero que se acabo de ñadir 
                    montoRestante -= cantidadUsar * billete.getDenominacion();
                }

            }
        }
        //validar qque el dinero fue suficiente con los billetes disponibles
        if (montoRestante > 0) {
            throw new IllegalArgumentException("No hay billetes suficientes para entregar el monto solicitado");
        }

        // recorrer todos los billetes del cajero
        for (Billete billete : billeteRepository.findAll()) {

            // obtener del mapa cuantos billetes se con la clave
            Integer cantidadUsada = billetesPorDenominacion.get(billete.getDenominacion());

            // si se uso almenos uno de los billetes entonces se actualiza la cantidad
            if (cantidadUsada != null && cantidadUsada > 0) {

                // se restamos la cantidad entregada de la cantidad disponible en el cajero
                billete.setCantidad(billete.getCantidad() - cantidadUsada);

                // Guardamos el billete actualizado en la base de datos
                billeteRepository.save(billete);
            }
        }

        //crear el objeto d eretiro
        Retiro nuevoRetiro = new Retiro();
        nuevoRetiro.setMonto(monto);
        nuevoRetiro.setFecha(LocalDateTime.now());

        //guardar el retiro en la base de datos
        retiroRepository.save(nuevoRetiro);

        //devolver lo billetes que se utilizaron
        return billetesPorDenominacion;
    }

}