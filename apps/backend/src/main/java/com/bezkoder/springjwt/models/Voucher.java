package com.bezkoder.springjwt.models;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.Date;
@Entity
@Table(name = "vouchers")
public class Voucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "voucherid")
    private Long voucherId;

    @Column(name = "couponcode")
    private String couponCode;

    @Column(name = "discountpercentage")
    private Double discountPercentage;

    @Column(name = "expirydate")
    private Date expiryDate;

    // Constructors, getters, and setters
}
