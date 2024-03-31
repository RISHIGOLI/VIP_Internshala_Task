package com.stocktrade.application.controllers;

import com.stocktrade.application.entities.Order;
import com.stocktrade.application.helper.Response;
import com.stocktrade.application.services.OrderMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderMasterController {
    @Autowired
    private OrderMasterService orderMasterService;

    @PostMapping("/createOrder")
    public ResponseEntity<Response<Order>> createOrder(
            @RequestParam Long tradeDetailId,
            @RequestBody Order order
    ){
        return orderMasterService.addOrder(tradeDetailId,order);
    }

    @GetMapping("/getAllOrders")
    public ResponseEntity<Response<Order>> getAllOrders(
            @RequestParam int pageNumber,
            @RequestParam int pageSize
    ){
        return orderMasterService.getAllOrders(pageNumber,pageSize);
    }
}
