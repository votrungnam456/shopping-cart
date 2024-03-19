package com.bezkoder.springjwt.models;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orderid")
    private Integer orderId;

    @ManyToOne
    @JoinColumn(name = "userid")
    private User user;

    @Column(name = "orderdate")
    private Date orderDate;

    @Column(name = "totalamount")
    private Double totalAmount;

    @Column(name = "status")
    private String status;

    @Column(name = "customerid")
    private Long customerId;

    // Constructors, getters, and setters
}
