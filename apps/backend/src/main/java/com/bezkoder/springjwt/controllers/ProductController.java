package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.Product;

import com.bezkoder.springjwt.payload.request.ProductRequest;
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
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
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
    @ResponseStatus(HttpStatus.OK)
    public List<ProductResponse> getAllProducts() {
        List<ProductResponse> productResponses = productService.getAllProductsWithCategories();
        if (productResponses.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No products found");
        }
        return productResponses;
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

    @PostMapping("/")
    public Product addProduct(@RequestBody ProductRequest productRequest) {
        return productService.saveProduct(productRequest);
    }

    @PutMapping("/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable("productId") Integer productId, @RequestBody ProductRequest productRequest) {
        Product updatedProduct = productService.updateProduct(productId, productRequest);
        if (updatedProduct == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    @DeleteMapping("/")
    public ResponseEntity<String> deleteProducts(@RequestBody Map<String, List<Integer>> requestBody) {
        List<Integer> productIds = requestBody.get("productIds");
        if (productIds == null || productIds.isEmpty()) {
            return new ResponseEntity<>("No productIds provided", HttpStatus.BAD_REQUEST);
        }

        boolean deleted = productService.deleteProducts(productIds);
        if (deleted) {
            return new ResponseEntity<>("Products have been deleted", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Some products not found", HttpStatus.NOT_FOUND);
        }
    }
}
