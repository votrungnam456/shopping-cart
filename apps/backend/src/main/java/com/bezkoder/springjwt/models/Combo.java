package com.bezkoder.springjwt.models;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "combos")
public class Combo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comboid")
    private Integer comboId;

    @Column(name = "comboname")
    private String comboName;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private Double price;

    @Column(name = "discountpercentage")
    private Double discountPercentage;

    @ManyToOne
    @JoinColumn(name = "productid1")
    private Product product1;

    @ManyToOne
    @JoinColumn(name = "productid2")
    private Product product2;

    // Constructors, getters, and setters
}
