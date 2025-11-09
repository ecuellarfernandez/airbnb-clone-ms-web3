package com.listings.airbnb_clone_ms_web_iii.listings.category.repository;

import com.listings.airbnb_clone_ms_web_iii.listings.category.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
}
