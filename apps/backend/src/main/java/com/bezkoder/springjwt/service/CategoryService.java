package com.bezkoder.springjwt.service;

import com.bezkoder.springjwt.models.Product;
import com.bezkoder.springjwt.payload.response.CategoryResponse;
import com.bezkoder.springjwt.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class CategoryService {
    @Autowired
    private ProductRepository productRepository;
    public List<CategoryResponse> getProductsByCategoryId(Integer categoryId) {
        List<Product> products = productRepository.findByCategoryId(categoryId);
        return products.stream()
                .map(this::convertToProductResponse)
                .collect(Collectors.toList());
    }

    private CategoryResponse convertToProductResponse(Product product) {
        CategoryResponse categoryResponse = new CategoryResponse();
        categoryResponse.setProductId(product.getProductId());
        categoryResponse.setProductName(product.getProductName());
        categoryResponse.setDescription(product.getDescription());
        categoryResponse.setPrice(product.getPrice());
        categoryResponse.setStockQuantity(product.getStockQuantity());

        return categoryResponse;
    }
}
