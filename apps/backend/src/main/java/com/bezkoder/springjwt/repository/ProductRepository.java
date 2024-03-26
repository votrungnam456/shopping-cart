package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query("SELECT p FROM Product p JOIN p.category c WHERE c.categoryId = :categoryId")
    List<Product> findByCategoryId(Integer categoryId);

    List<Product> findByProductNameContainingIgnoreCase(String keyword);

}
