package com.bezkoder.springjwt.models;

import jakarta.persistence.*;

@Entity
@Table(name = "cartitems")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cartitemid")
    private Integer cartItemId;

    @ManyToOne
    @JoinColumn(name = "userid")
    private User user;

    @ManyToOne
    @JoinColumn(name = "productid")
    private Product product;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "order_id")
    private Long orderId;

    // Constructors, getters, and setters
}