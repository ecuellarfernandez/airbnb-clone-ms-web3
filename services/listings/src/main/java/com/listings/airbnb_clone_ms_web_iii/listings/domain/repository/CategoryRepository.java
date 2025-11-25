package com.listings.airbnb_clone_ms_web_iii.listings.domain.repository;

import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.Category;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface CategoryRepository {

    Optional<Category> findById(UUID id);

    List<Category> findAll();

    List<Category> findAllWithType();

    List<Category> findByCategoryTypeId(UUID categoryTypeId);

    Set<Category> findAllByIds(Set<UUID> ids);
}
