package com.stocktrade.application.repositories;

import com.stocktrade.application.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderMasterRepo extends JpaRepository<Order,Long> {
}
