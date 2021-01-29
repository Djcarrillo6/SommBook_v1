package com.projects.sommbook.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name="tastings")
public class TastingSheet {

	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
	
	@Column(name="varietal")
	@Size(min=3, message="Varietal name must be at least 3 characters long.")
	private String varietal;
	
	@Column(name="vintage")
	@Size(min=4, message="Vintage must be entered as a 4-digit year.")
	private String vintage;
	
	@Column(name="vintner")
	@Size(min=3, message="Vintner must be at least 3 character.")
	private String vintner;
	
	@Column(name="rating")
	@Min(1)
	@Max(10)
	private String rating; 
	
	@Column(name="review")
	@Size(min=3, message="Review must be at least 3 characters in length.")
	private String review;
	
	@Column(name="country")
	@Size(min=2, message="Country must be at least 2 characters in length")
	private String country;
	
    @Column(updatable=false)
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date createdAt;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date updatedAt;
	
	// Getters & Setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getVarietal() {
		return varietal;
	}

	public void setVarietal(String varietal) {
		this.varietal = varietal;
	}

	public String getVintage() {
		return vintage;
	}

	public void setVintage(String vintage) {
		this.vintage = vintage;
	}

	public String getVintner() {
		return vintner;
	}

	public void setVintner(String vintner) {
		this.vintner = vintner;
	}

	public String getRating() {
		return rating;
	}

	public void setRating(String rating) {
		this.rating = rating;
	}

	public String getReview() {
		return review;
	}

	public void setReview(String review) {
		this.review = review;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}
	
    
    // Empty constructor for future JSP & form; Java specific.
	public TastingSheet() {};
	
	// Constructor
	public TastingSheet(String varietal, String vintage, String vintner, String rating, String review, String country) {
		this.varietal = varietal;
		this.vintage = vintage;
		this.vintner = vintner;
		this.rating = rating;
		this.review = review;
		this.country = country;
	};
	
	
    @PrePersist
    protected void onCreate(){
        this.createdAt = new Date();
        this.updatedAt = new Date();
    };
    @PreUpdate
    protected void onUpdate(){
        this.updatedAt = new Date();
    };
}
