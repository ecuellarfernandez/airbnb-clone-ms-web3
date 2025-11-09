package com.listings.airbnb_clone_ms_web_iii.listings.category_type.repository;

import com.listings.airbnb_clone_ms_web_iii.listings.category_type.model.CategoryType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CategoryTypeRepository extends JpaRepository<CategoryType, UUID> {
}
