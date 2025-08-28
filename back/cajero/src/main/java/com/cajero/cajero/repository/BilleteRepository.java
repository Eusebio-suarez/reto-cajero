package com.cajero.cajero.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cajero.cajero.entity.Billete;

@Repository
public interface BilleteRepository extends JpaRepository<Billete,Integer> {
    List<Billete> findAllByOrderByDenominacionDesc();
}