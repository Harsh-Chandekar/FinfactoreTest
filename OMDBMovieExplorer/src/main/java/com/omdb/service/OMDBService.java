package com.omdb.service;

import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;

import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;


import java.net.URI;
import java.util.Map;

@Service
public class OMDBService {
	
	private final RestTemplate restTemplate = new RestTemplate();


	@Value("${omdb.api.url}")
	private String omdbBaseUrl;


	@Value("${omdb.api.key}")
	private String apiKeyEnv;


	private String getApiKey() {
		//System.out.println("key : " + apiKeyEnv);
	if (apiKeyEnv == null || apiKeyEnv.isBlank()) {
	throw new IllegalStateException("OMDB API key not set. Set environment variable OMDB_API_KEY");
	}
	return apiKeyEnv;
	}


	@Cacheable(value = "searchCache", key = "#title + '_' + #page")
	public Map<String, Object> searchByTitle(String title, int page) {
	URI uri = UriComponentsBuilder.fromUriString(omdbBaseUrl)
	.queryParam("apikey", getApiKey())
	.queryParam("s", title)
	.queryParam("page", page)
	.build().toUri();

//System.out.println(uri);
	ResponseEntity<Map> resp = restTemplate.getForEntity(uri, Map.class);
	return resp.getBody();
	}


	@Cacheable(value = "detailCache", key = "#imdbId")
	public Map<String, Object> getByImdbId(String imdbId) {
	URI uri = UriComponentsBuilder.fromUriString(omdbBaseUrl)
	.queryParam("apikey", getApiKey())
	.queryParam("i", imdbId)
	.queryParam("plot", "full")
	.build().toUri();


	ResponseEntity<Map> resp = restTemplate.getForEntity(uri, Map.class);
	return resp.getBody();
	}

}
