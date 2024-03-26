package com.bezkoder.springjwt.payload.request;

import com.bezkoder.springjwt.models.Category;

import java.util.List;
import java.util.Set;

public class ProductRequest {
    private String productName;
    private String description;
    private Double price;
    private Integer stockQuantity;
    private Set<Integer> categoryIds;

    // Getters and setters


    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public Set<Integer> getCategoryIds() {
        return categoryIds;
    }

    public void setCategoryIds(Set<Integer> categoryIds) {
        this.categoryIds = categoryIds;
    }
}