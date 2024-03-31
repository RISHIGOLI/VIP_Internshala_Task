package com.stocktrade.application.repositories;

import com.stocktrade.application.entities.TradeDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TradeDetailsRepo extends JpaRepository<TradeDetail,Long> {
}
