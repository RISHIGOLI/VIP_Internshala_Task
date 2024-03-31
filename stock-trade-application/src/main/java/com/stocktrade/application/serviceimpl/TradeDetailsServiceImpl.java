package com.stocktrade.application.serviceimpl;

import com.stocktrade.application.entities.TradeDetail;
import com.stocktrade.application.helper.AppConstants;
import com.stocktrade.application.helper.Response;
import com.stocktrade.application.repositories.TradeDetailsRepo;
import com.stocktrade.application.services.TradeDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
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
public class TradeDetailsServiceImpl implements TradeDetailsService {
    @Autowired
    private TradeDetailsRepo tradeDetailsRepo;
    @Override
    public ResponseEntity<Response<TradeDetail>> addTradeDetails(TradeDetail tradeDetail) {
        if (tradeDetail != null){
            tradeDetail.setTradeDateTime(new Date());
            TradeDetail savedTradeDetail = tradeDetailsRepo.save(tradeDetail);
            return new ResponseEntity<>(new Response<>(true, HttpStatus.CREATED.value(),"Trade details saved successfully", Collections.singletonList(savedTradeDetail)), HttpStatus.CREATED);
        }
        return new ResponseEntity<>(new Response<>(false, 400, "Trade details could not be saved"), HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<Response<TradeDetail>> getAllTradeDetails(int pageNumber, int pageSize) {
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize, Sort.by(Sort.Direction.ASC, AppConstants.KEY_TRADE_DATE_TIME));
        Page<TradeDetail> tradeDetailsPage = tradeDetailsRepo.findAll(pageRequest);

        List<TradeDetail> tradeDetails = tradeDetailsPage.getContent();
        long totalItems = tradeDetailsPage.getTotalElements();
        int totalPages = tradeDetailsPage.getTotalPages();

        if (!tradeDetails.isEmpty()) {
            Response<TradeDetail> response = new Response<>(
                    true,
                    HttpStatus.OK.value(),
                    "Query Successful",
                    tradeDetails.size(),
                    pageNumber,
                    totalPages,
                    totalItems, // Total count should be the same as total items
                    tradeDetails
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new Response<>(false, HttpStatus.NO_CONTENT.value(), "Content Not Found"), HttpStatus.NO_CONTENT);
        }
    }

    @Override
    public ResponseEntity<Response<TradeDetail>> updateTradeDetail(TradeDetail tradeDetail) {
        Optional<TradeDetail> tradeDetailFromDBOptional = tradeDetailsRepo.findById(tradeDetail.getId());
        if (!tradeDetailFromDBOptional.isPresent()){
            return new ResponseEntity<>(new Response<TradeDetail>(false, HttpStatus.BAD_REQUEST.value(), "Trade not found !"), HttpStatus.BAD_REQUEST);
        }
        TradeDetail tradeDetailFromDB = tradeDetailFromDBOptional.get();
        tradeDetailFromDB.setStockName(tradeDetail.getStockName());
        tradeDetailFromDB.setListingPrice(tradeDetail.getListingPrice());
        tradeDetailFromDB.setQuantity(tradeDetail.getQuantity());
        tradeDetailFromDB.setType(tradeDetail.getType());
        tradeDetailFromDB.setTradeDateTime(tradeDetail.getTradeDateTime());
        tradeDetailFromDB.setPricePerUnit(tradeDetail.getPricePerUnit());

        TradeDetail savedTradeDetail = tradeDetailsRepo.save(tradeDetailFromDB);
        return new ResponseEntity<>(new Response<TradeDetail>(true, HttpStatus.CREATED.value(), "Trade details updated successfully", Collections.singletonList(savedTradeDetail)), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Response> deleteTradeDetailById(String tradeDetailId) {
        try {
            tradeDetailsRepo.deleteById(Long.valueOf(tradeDetailId));
            return new ResponseEntity<>(new Response<>(true, HttpStatus.OK.value(), "Trade detail deleted successfully"), HttpStatus.OK);
        } catch (EmptyResultDataAccessException ex) {
            return new ResponseEntity<>(new Response<>(false, HttpStatus.NOT_FOUND.value(), "Trade detail not found"), HttpStatus.NOT_FOUND);
        } catch (Exception ex) {
            return new ResponseEntity<>(new Response<>(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed to delete trade detail"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
