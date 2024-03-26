package com.bezkoder.springjwt.service;

import com.bezkoder.springjwt.models.Category;
import com.bezkoder.springjwt.models.Product;
import com.bezkoder.springjwt.payload.request.ProductRequest;
import com.bezkoder.springjwt.payload.response.ProductResponse;
import com.bezkoder.springjwt.repository.CategoryRepository;
import com.bezkoder.springjwt.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

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
    public List<ProductResponse> searchProducts(String keyword) {
        List<Product> products = productRepository.findByProductNameContainingIgnoreCase(keyword);
        return products.stream()
                .map(this::convertToProductResponse)
                .collect(Collectors.toList());
    }

    public Product saveProduct(ProductRequest productRequest) {
        Product product = new Product();
        product.setProductName(productRequest.getProductName());
        product.setDescription(productRequest.getDescription());
        product.setPrice(productRequest.getPrice());
        product.setStockQuantity(productRequest.getStockQuantity());

        // Convert category IDs to Category objects and set them in the product
        Set<Category> categories = new HashSet<>();
        for (Integer categoryId : productRequest.getCategoryIds()) {
            Category category = categoryRepository.findById(categoryId).orElse(null);
            if (category != null) {
                categories.add(category);
            }
        }
        if (!categories.isEmpty()) {
            Category category = categories.iterator().next();
            product.setCategory(category);
        }

        return productRepository.save(product);
    }
    public Product updateProduct(Integer productId, ProductRequest productRequest) {
        Product existingProduct = productRepository.findById(productId).orElse(null);
        if (existingProduct == null) {
            return null; // or throw an exception
        }

        existingProduct.setProductName(productRequest.getProductName());
        existingProduct.setDescription(productRequest.getDescription());
        existingProduct.setPrice(productRequest.getPrice());
        existingProduct.setStockQuantity(productRequest.getStockQuantity());
        return productRepository.save(existingProduct);
    }

    public boolean deleteProducts(List<Integer> productIds) {
        boolean allDeleted = true;
        for (Integer productId : productIds) {
            if (!productRepository.existsById(productId)) {
                allDeleted = false;
            } else {
                productRepository.deleteById(productId);
            }
        }
        return allDeleted;
    }
    private ProductResponse convertToProductResponse(Product product) {
        ProductResponse productResponse = new ProductResponse();
        productResponse.setProductId(product.getProductId());
        productResponse.setProductName(product.getProductName());
        productResponse.setDescription(product.getDescription());
        productResponse.setPrice(product.getPrice());
        productResponse.setStockQuantity(product.getStockQuantity());
        productResponse.setCategories(product.getCategory());
        return productResponse;
    }

}
