package com.stocktrade.application.serviceimpl;

import com.stocktrade.application.entities.Order;
import com.stocktrade.application.entities.TradeDetail;
import com.stocktrade.application.exceptions.ResourceNotFoundException;
import com.stocktrade.application.helper.AppConstants;
import com.stocktrade.application.helper.Response;
import com.stocktrade.application.repositories.OrderMasterRepo;
import com.stocktrade.application.repositories.TradeDetailsRepo;
import com.stocktrade.application.services.OrderMasterService;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderMasterServiceImpl implements OrderMasterService {
    @Autowired
    private OrderMasterRepo orderMasterRepo;
    @Autowired
    private TradeDetailsRepo tradeDetailsRepo;
    @Override
    public ResponseEntity<Response<Order>> addOrder(Long tradeDetailId, Order order) {
        if (tradeDetailId != null && order != null) {
            Optional<TradeDetail> tradeDetailOptional = tradeDetailsRepo.findById(tradeDetailId);
            if (tradeDetailOptional.isPresent()) {
                TradeDetail tradeDetail = tradeDetailOptional.get();
                order.setTradeDetail(tradeDetail);
                order.setStatus(AppConstants.STATUS_CREATED);
                order.setOrderDateTime(new Date());
                Order savedOrder = orderMasterRepo.save(order);
                return new ResponseEntity<>(new Response<>(true, HttpStatus.CREATED.value(), "Order created successfully", Collections.singletonList(savedOrder)), HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(new Response<>(false, HttpStatus.BAD_REQUEST.value(), "Trade not found with the given trade ID"), HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(new Response<>(false, HttpStatus.BAD_REQUEST.value(), "Invalid request parameters"), HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<Response<Order>> getAllOrders(int pageNumber, int pageSize) {
        PageRequest pageRequest = PageRequest.of(pageNumber,pageSize,Sort.by(Sort.Direction.ASC, AppConstants.KEY_ORDER_DATE_TIME));
        Page<Order> orderPage = orderMasterRepo.findAll(pageRequest);

        List<Order> orders = orderPage.getContent();
        long totalItems = orderPage.getTotalElements();
        int totalPages = orderPage.getTotalPages();

        if (!orders.isEmpty()) {
            Response<Order> response = new Response<>(
                    true,
                    HttpStatus.OK.value(),
                    "Query Successful",
                    orders.size(),
                    pageNumber,
                    totalPages,
                    totalItems, // Total count should be the same as total items
                    orders
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new Response<>(false, HttpStatus.NO_CONTENT.value(), "Content Not Found"), HttpStatus.NO_CONTENT);
        }
    }
}
