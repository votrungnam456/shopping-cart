package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.Product;

import com.bezkoder.springjwt.payload.response.CategoryResponse;
import com.bezkoder.springjwt.payload.response.ProductResponse;
import com.bezkoder.springjwt.repository.CategoryRepository;
import com.bezkoder.springjwt.repository.ProductRepository;
import com.bezkoder.springjwt.service.CategoryService;
import com.bezkoder.springjwt.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    ProductService productService;

    @Autowired
    CategoryService categoryService;

    @Autowired
    private CategoryRepository categoryRepository;
    @GetMapping("/all")
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        List<ProductResponse> productResponses = productService.getAllProductsWithCategories();
        if (!productResponses.isEmpty()) {
            return new ResponseEntity<>(productResponses, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Integer productId) {
        ProductResponse productResponse = productService.getProductById(productId);
        if (productResponse != null) {
            return new ResponseEntity<>(productResponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<CategoryResponse>> getProductsByCategoryId(@PathVariable Integer categoryId) {
        List<CategoryResponse> categoryResponse = categoryService.getProductsByCategoryId(categoryId);
        if (!categoryResponse.isEmpty()) {
            return new ResponseEntity<>(categoryResponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductResponse>> searchProducts(@RequestParam("keyword") String keyword) {
        List<ProductResponse> productResponses = productService.searchProducts(keyword);
        if (!productResponses.isEmpty()) {
            return new ResponseEntity<>(productResponses, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
