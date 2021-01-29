package com.projects.sommbook.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.projects.sommbook.models.TastingSheet;

public interface TastingSheetRepository extends JpaRepository<TastingSheet, Long> {
	
	// Get All Tasting Sheets in DB.
	List<TastingSheet> findAll();
	
	// Find all Tasting Sheets BY varietal & BY varietal NOT & Sort obj.
	List<TastingSheet> findByVarietalContaining(String varietal);
	List<TastingSheet> findByVarietalContaining(String varietal, Sort sort);
	List<TastingSheet> findByVarietalNot(String varietal); 
	
	// Find all Tasting Sheets BY vintage & BY vintage NOT & Sort obj.
	List<TastingSheet> findByVintage(String vintage, Sort sort);
	List<TastingSheet> findByVintageNot(String vintage);
	
	// Find all Tasting Sheet BY vintner & By vintner NOT & Sort obj.
	List<TastingSheet> findByVintnerContaining(String vintner, Sort sort);
	List<TastingSheet> findByVintnerNot(String vintner);
	
	// Find all Tasting Sheet BY rating & BY rating NOT & Sort obj.
	List<TastingSheet> findByRating(String rating, Sort sort);
	List<TastingSheet> findByRatingNot(String rating);
	
	// Find all Tasting Sheet BY country & BY country NOT & Sort obj.
	List<TastingSheet> findByCountryContaining(String country, Sort sort);
	List<TastingSheet> findByCountryNot(String country);
	
	// Find all Tasting Sheets BY createdAt & BY createdAt NOT & Sort obj.
	List<TastingSheet> findByCreatedAt(Date target);
	List<TastingSheet> findByCreatedAtNot(Date target);
	
	
	// Pagination Methods
	Page<TastingSheet> findByVarietalContaining(String varietal, Pageable pageable);
	
	Page<TastingSheet> findByVintnerContaining(String vintner, Pageable pageable);
	
	Page<TastingSheet> findByVintageContaining(String vintage, Pageable pageable);
	
	Page<TastingSheet> findByRating(String rating, Pageable pageable);

	Page<TastingSheet> findByCountryContaining(String country, Pageable pageable);

	
	
	
	
}
