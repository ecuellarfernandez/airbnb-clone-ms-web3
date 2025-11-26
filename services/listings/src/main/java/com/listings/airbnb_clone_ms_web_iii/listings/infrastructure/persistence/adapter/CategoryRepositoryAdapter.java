package com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.persistence.adapter;

import com.listings.airbnb_clone_ms_web_iii.listings.domain.model.Category;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.repository.CategoryRepository;
import com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.persistence.jpa.JpaCategoryRepository;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Component
public class CategoryRepositoryAdapter implements CategoryRepository {

    private final JpaCategoryRepository jpaRepository;

    public CategoryRepositoryAdapter(JpaCategoryRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public Optional<Category> findById(UUID id) {
        return jpaRepository.findById(id);
    }

    @Override
    public List<Category> findAll() {
        return jpaRepository.findAll();
    }

    @Override
    public List<Category> findAllWithType() {
        return jpaRepository.findAllWithType();
    }

    @Override
    public List<Category> findByCategoryTypeId(UUID categoryTypeId) {
        return jpaRepository.findByCategoryTypeId(categoryTypeId);
    }

    @Override
    public Set<Category> findAllByIds(Set<UUID> ids) {
        return new HashSet<>(jpaRepository.findAllById(ids));
    }
}
