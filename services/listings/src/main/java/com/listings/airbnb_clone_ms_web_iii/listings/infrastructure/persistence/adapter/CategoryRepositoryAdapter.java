package com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.persistence.adapter;

import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.Category;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.repository.CategoryRepository;
import com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.persistence.jpa.JpaCategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class CategoryRepositoryAdapter implements CategoryRepository {

    private final JpaCategoryRepository jpaRepository;

    @Override
    public Optional<Category> findById(UUID id) {
        log.debug("Finding category by ID: {}", id);
        return jpaRepository.findById(id);
    }

    @Override
    public List<Category> findAll() {
        log.debug("Finding all categories");
        return jpaRepository.findAll();
    }

    @Override
    public List<Category> findAllWithType() {
        log.debug("Finding all categories with type");
        return jpaRepository.findAllWithType();
    }

    @Override
    public List<Category> findByCategoryTypeId(UUID categoryTypeId) {
        log.debug("Finding categories by type ID: {}", categoryTypeId);
        return jpaRepository.findByCategoryTypeId(categoryTypeId);
    }

    @Override
    public Set<Category> findAllByIds(Set<UUID> ids) {
        log.debug("Finding categories by IDs: {}", ids);
        return new HashSet<>(jpaRepository.findAllById(ids));
    }
}
