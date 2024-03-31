package com.stocktrade.application.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.stocktrade.application.helper.TradeType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "trade_details")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TradeDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "trade_date_time")
    private Date tradeDateTime;

    @Column(name = "stock_name")
    private String stockName;

    @Column(name = "listing_price")
    private Double listingPrice;

    private int quantity;

    @Enumerated(EnumType.STRING)
    private TradeType type;

    @Column(name = "price_per_unit")
    private Double pricePerUnit;

    @OneToMany(mappedBy = "tradeDetail", cascade = CascadeType.DETACH, fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonIgnore
    private List<Order> orders = new ArrayList<>();
}
