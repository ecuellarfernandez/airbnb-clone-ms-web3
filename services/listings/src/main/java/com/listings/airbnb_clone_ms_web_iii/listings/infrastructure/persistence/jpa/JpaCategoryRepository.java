package com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.persistence.jpa;

import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface JpaCategoryRepository extends JpaRepository<Category, UUID> {

    @Query("SELECT c FROM Category c JOIN FETCH c.categoryType")
    List<Category> findAllWithType();

    List<Category> findByCategoryTypeId(UUID categoryTypeId);
}
