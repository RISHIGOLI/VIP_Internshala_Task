package com.stocktrade.application.controllers;

import com.stocktrade.application.entities.TradeDetail;
import com.stocktrade.application.helper.Response;
import com.stocktrade.application.services.TradeDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TradeDetailsController {
    @Autowired
    private TradeDetailsService tradeDetailsService;

    @PostMapping("/addTradeDetail")
    public ResponseEntity<Response<TradeDetail>> addTradeDetail(
            @RequestBody TradeDetail tradeDetail
    ){
        return tradeDetailsService.addTradeDetails(tradeDetail);
    }

    @GetMapping("/getAllTradeDetails")
    public ResponseEntity<Response<TradeDetail>> getAllTradeDetails(
            @RequestParam int pageNumber,
            @RequestParam int pageSize
    ){
        return tradeDetailsService.getAllTradeDetails(pageNumber,pageSize);
    }

    @PutMapping("/updateTradeDetail")
    public ResponseEntity<Response<TradeDetail>> updateTradeDetail(
            @RequestBody TradeDetail tradeDetail
    ){
        return tradeDetailsService.updateTradeDetail(tradeDetail);
    }

    @DeleteMapping("/deleteTradeDetailById")
    public ResponseEntity<Response> deleteTradeDetailById(
            @RequestParam String tradeDetailId
    ){
        return tradeDetailsService.deleteTradeDetailById(tradeDetailId);
    }
}
