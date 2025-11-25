package com.omdb.controller;

import com.omdb.service.OMDBService;
import jakarta.validation.constraints.NotBlank;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class OMDBController {
	
	private final OMDBService omdbService;


	public OMDBController(OMDBService omdbService) {
	this.omdbService = omdbService;
	}


	// Search by title: /api/search?title=batman&page=1
	@GetMapping("/search")
	public ResponseEntity<?> search(@RequestParam @NotBlank String title,
	@RequestParam(defaultValue = "1") int page) {
	Map<String, Object> result = omdbService.searchByTitle(title, page);
	return ResponseEntity.ok(result);
	}


	// Get details: /api/movie/{imdbId}
	@GetMapping("/movie/{imdbId}")
	public ResponseEntity<?> getMovie(@PathVariable String imdbId) {
		System.out.println("id : " + imdbId);	
	Map<String, Object> result = omdbService.getByImdbId(imdbId);
	return ResponseEntity.ok(result);
	}


	// Health check
	@GetMapping("/health")
	public ResponseEntity<?> health() {
	return ResponseEntity.ok(Map.of("status", "ok"));
	}

}
