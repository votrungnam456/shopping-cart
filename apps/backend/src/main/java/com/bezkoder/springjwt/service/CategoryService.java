package com.bezkoder.springjwt.service;

import com.bezkoder.springjwt.models.Category;
import com.bezkoder.springjwt.models.Product;
import com.bezkoder.springjwt.payload.response.CategoryResponse;
import com.bezkoder.springjwt.repository.CategoryRepository;
import com.bezkoder.springjwt.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
@Service
public class CategoryService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductService productService;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(Integer categoryId) {
        return categoryRepository.findById(categoryId).orElse(null);
    }

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category updateCategory(Integer categoryId, Category category) {
        Category existingCategory = categoryRepository.findById(categoryId).orElse(null);
        if (existingCategory != null) {
            category.setCategoryId(categoryId);
            return categoryRepository.save(category);
        }
        return null;
    }

    @Transactional
    public boolean deleteCategory(Integer categoryId) {
        // Find the category to delete
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
        // Delete the category
        categoryRepository.deleteById(categoryId);
        return true;
//        if (optionalCategory.isPresent()) {
//            Category category = optionalCategory.get();
//
//            // Get all products belonging to the category
//
//            // Iterate through each product
//            for (Product product : products) {
//                // Check if the product belongs to other categories
//                if (product.getCategories().size() == 1 && product.getCategories().contains(category)) {
//                    // If the product only belongs to the category to be deleted, delete the product
////                    productService.deleteProducts(product.getProductId());
//                } else {
//                    // If the product belongs to multiple categories, only remove the relationship between product and category
//                    product.getCategories().remove(category);
//                }
//            }
//
//
//            return true;
//        } else {
//            // Handle the case where the category does not exist
//            // throw Exception or handle accordingly
//            return false;
//        }
    }
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

    private Product convertToProduct(CategoryResponse categoryResponse) {
        Product product = new Product();
        product.setProductId(categoryResponse.getProductId());
        product.setProductName(categoryResponse.getProductName());
        product.setDescription(categoryResponse.getDescription());
        product.setPrice(categoryResponse.getPrice());
        product.setStockQuantity(categoryResponse.getStockQuantity());
        return product;
    }
}
