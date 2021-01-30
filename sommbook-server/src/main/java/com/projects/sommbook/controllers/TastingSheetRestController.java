package com.projects.sommbook.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.projects.sommbook.exceptions.ResourceNotFoundException;
import com.projects.sommbook.models.TastingSheet;
import com.projects.sommbook.repositories.TastingSheetRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class TastingSheetRestController {
  
	@Autowired
	TastingSheetRepository tastingSheetRepo;
	
	// Sorting methods
	private Sort.Direction getSortDirection(String direction) {
		  if (direction.equals("asc")) {
		    return Sort.Direction.ASC;
		  } else if (direction.equals("desc")) {
		    return Sort.Direction.DESC;
		  }

		  return Sort.Direction.ASC;
		}
	
	// DOCGEN generated documentation for SommBook
	@GetMapping("/sommbook-docs")
	public String docs() {
		return "index.html";
	};
	
	
	// GET all tastings SORTED
	@GetMapping("/sortedtastings")
	  public ResponseEntity<List<TastingSheet>> getAllTastings(@RequestParam(defaultValue = "id,desc") String[] sort) {

	    try {
	      List<Order> orders = new ArrayList<Order>();

	      if (sort[0].contains(",")) {
	        // will sort more than 2 fields
	        // sortOrder="field, direction"
	        for (String sortOrder : sort) {
	          String[] _sort = sortOrder.split(",");
	          orders.add(new Order(getSortDirection(_sort[1]), _sort[0]));
	        }
	      } else {
	        // sort=[field, direction]
	        orders.add(new Order(getSortDirection(sort[1]), sort[0]));
	      }

	      List<TastingSheet> tutorials = tastingSheetRepo.findAll(Sort.by(orders));

	      if (tutorials.isEmpty()) {
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	      }

	      return new ResponseEntity<>(tutorials, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	  }

	
	// GET all Tasting Sheets in the DB
	@GetMapping("/tastings")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<Map<String, Object>> getAllTastingsPage(
		      @RequestParam(required = false) String varietal,
		      @RequestParam(defaultValue = "0") int page,
		      @RequestParam(defaultValue = "3") int size,
		      @RequestParam(defaultValue = "id,desc") String[] sort) {

		    try {
		      List<Order> orders = new ArrayList<Order>();

		      if (sort[0].contains(",")) {
		        // will sort more than 2 fields
		        // sortOrder="field, direction"
		        for (String sortOrder : sort) {
		          String[] _sort = sortOrder.split(",");
		          orders.add(new Order(getSortDirection(_sort[1]), _sort[0]));
		        }
		      } else {
		        // sort=[field, direction]
		        orders.add(new Order(getSortDirection(sort[1]), sort[0]));
		      }

		      List<TastingSheet> tastings = new ArrayList<TastingSheet>();
		      Pageable pagingSort = PageRequest.of(page, size, Sort.by(orders));

		      Page<TastingSheet> pageTuts;
		      if (varietal == null)
		        pageTuts = tastingSheetRepo.findAll(pagingSort);
		      else
		        pageTuts = tastingSheetRepo.findByVarietalContaining(varietal, pagingSort);

		      tastings = pageTuts.getContent();

		      if (tastings.isEmpty()) {
		        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		      }

		      Map<String, Object> response = new HashMap<>();
		      response.put("tastings", tastings);
		      response.put("currentPage", pageTuts.getNumber());
		      response.put("totalItems", pageTuts.getTotalElements());
		      response.put("totalPages", pageTuts.getTotalPages());

		      return new ResponseEntity<>(response, HttpStatus.OK);
		    } catch (Exception e) {
		      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		    }
		  }
	
//	 @GetMapping("/tastings/vintage")
//	  public ResponseEntity<Map<String, Object>> findByVintage(
//	      @RequestParam(defaultValue = "0") int page,
//	      @RequestParam(defaultValue = "3") int size,
//	      @RequestBody(required = true) String vintage) {
//	    
//	    try { 
//	      List<TastingSheet> tastings = new ArrayList<TastingSheet>();
//	      Pageable paging = PageRequest.of(page, size);
//
//	      Page<TastingSheet> pageTuts = tastingSheetRepo.findByVintageContaining(vintage, paging);
//	      tastings = pageTuts.getContent();
//
//	      Map<String, Object> response = new HashMap<>();
//	      response.put("tastings", tastings);
//	      response.put("currentPage", pageTuts.getNumber());
//	      response.put("totalItems", pageTuts.getTotalElements());
//	      response.put("totalPages", pageTuts.getTotalPages());
//
//	      return new ResponseEntity<>(response, HttpStatus.OK);
//	    } catch (Exception e) {
//	      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//	    }
//	  }
	  
	
	// GET Tasting Sheet by it's ID.
		@GetMapping("/tastings/{id}")
		@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
		public ResponseEntity<TastingSheet> getTastingById(@PathVariable("id") Long id){
			// Optional<TastingSheet> tastingData = tastingSheetRepo.findById(id);
			
					TastingSheet tasting = tastingSheetRepo.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Not found Tasting Sheet with id = " + id));

			return new ResponseEntity<>(tasting, HttpStatus.OK);
			
		}; 
		
		
		// POST a new Tasting Sheet to the DB. 
		@PostMapping("/tastings")
		@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
		public ResponseEntity<TastingSheet> createTasting(@RequestBody TastingSheet tasting) {
			System.out.println("New ticket route has been hit...");
			System.out.println(tasting.getVintage());
			
			try {
				TastingSheet _tasting = tastingSheetRepo
						.save(new TastingSheet(tasting.getVarietal(), 
								tasting.getVintage(),
								tasting.getVintner(),
								tasting.getRating(),
								tasting.getReview(),
								tasting.getCountry()));

				System.out.println("New Tasting Sheet has been created!");
						return new ResponseEntity<>(_tasting, HttpStatus.CREATED);
						
			} catch(Exception e) {
				System.out.println("INTERNAL SERVER ERROR; 500");
				return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR); 
			}
		};
		
		
		// PUT to update a Tasting Sheet in the DB.
		@PutMapping("/tastings/{id}")
		@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
		public ResponseEntity<TastingSheet> updateTasting(@PathVariable("id") long id, @RequestBody TastingSheet tasting){
			// Optional<TastingSheet> tastingData = tastingSheetRepo.findById(id);
			
			TastingSheet _tasting = tastingSheetRepo.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Not found Tasting Sheet with id = " + id));
			
				// _tasting = tastingData.get();
				_tasting.setVarietal(tasting.getVarietal());
				_tasting.setVintner(tasting.getVintner());
				_tasting.setVintage(tasting.getVintage());
				_tasting.setRating(tasting.getRating());
				_tasting.setReview(tasting.getReview());
				_tasting.setCountry(tasting.getCountry());
				
				return new ResponseEntity<>(tastingSheetRepo.save(_tasting), HttpStatus.OK);
			
		};
		
		// DELETE to remove a Tasting Sheet from the DB.
		@DeleteMapping("/tastings/{id}")
		@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
		public ResponseEntity<HttpStatus> deleteTasting(@PathVariable("id") long id){
			try {
				tastingSheetRepo.deleteById(id);
			      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			    } catch (Exception e) {
			      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			    }
		};
		
		
		// ** DELETE to remove ALL Tasting Sheets from a user's log. **
		 @DeleteMapping("/tastings")
		 @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
		  public ResponseEntity<HttpStatus> deleteAllTastings() {
		    try {
		    	tastingSheetRepo.deleteAll();
		      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		    } catch (Exception e) {
		      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		    }

		  };

		
};
