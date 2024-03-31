package com.stocktrade.application.services;


import com.stocktrade.application.entities.TradeDetail;
import com.stocktrade.application.helper.Response;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TradeDetailsService {
    ResponseEntity<Response<TradeDetail>> addTradeDetails(TradeDetail tradeDetail);

    ResponseEntity<Response<TradeDetail>> getAllTradeDetails(int pageNumber, int pageSize);

    ResponseEntity<Response<TradeDetail>> updateTradeDetail(TradeDetail tradeDetail);

    ResponseEntity<Response> deleteTradeDetailById(String tradeDetailId);
}
