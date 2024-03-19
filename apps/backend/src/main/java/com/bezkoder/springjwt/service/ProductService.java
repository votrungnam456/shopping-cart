package com.bezkoder.springjwt.service;

import com.bezkoder.springjwt.models.Category;
import com.bezkoder.springjwt.models.Product;
import com.bezkoder.springjwt.payload.response.ProductResponse;
import com.bezkoder.springjwt.repository.CategoryRepository;
import com.bezkoder.springjwt.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<ProductResponse> getAllProductsWithCategories() {
        List<Product> products = productRepository.findAll();

        return products.stream()
                .map(this::convertToProductResponse)
                .collect(Collectors.toList());
    }

    public ProductResponse getProductById(Integer productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);

        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            return convertToProductResponse(product);
        } else {
            return null;
        }
    }

    private ProductResponse convertToProductResponse(Product product) {
        ProductResponse productResponse = new ProductResponse();
        productResponse.setProductId(product.getProductId());
        productResponse.setProductName(product.getProductName());
        productResponse.setDescription(product.getDescription());
        productResponse.setPrice(product.getPrice());
        productResponse.setStockQuantity(product.getStockQuantity());
        productResponse.setCategories(product.getCategories());

        return productResponse;
    }

}
