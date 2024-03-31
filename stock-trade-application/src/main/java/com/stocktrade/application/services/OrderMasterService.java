package com.stocktrade.application.services;

import com.stocktrade.application.entities.Order;
import com.stocktrade.application.helper.Response;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface OrderMasterService {
    ResponseEntity<Response<Order>> addOrder(Long tradeDetailId, Order order);

    ResponseEntity<Response<Order>> getAllOrders(int pageNumber, int pageSize);
}
