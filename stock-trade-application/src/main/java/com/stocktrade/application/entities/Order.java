package com.stocktrade.application.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.stocktrade.application.helper.TradeType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "order_master")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "trade_detail_id", referencedColumnName = "id", nullable = false)
    private TradeDetail tradeDetail;

    private int quantity;
    private double pricePerUnit;
    @Enumerated(EnumType.STRING)
    private TradeType type;
    private String status;
    private Date orderDateTime;

}
