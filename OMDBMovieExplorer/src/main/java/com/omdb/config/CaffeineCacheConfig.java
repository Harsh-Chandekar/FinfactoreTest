package com.omdb.config;

import org.springframework.context.annotation.Configuration;
import com.github.benmanes.caffeine.cache.Caffeine;

import java.util.concurrent.TimeUnit;

import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;


@Configuration
public class CaffeineCacheConfig {

	@Bean
	public Caffeine<Object, Object> caffeineConfig() {
	return Caffeine.newBuilder()
	.expireAfterWrite(30, TimeUnit.MINUTES) // cache TTL
	.maximumSize(500); // max entries
	}


	@Bean
	public CacheManager cacheManager(Caffeine<Object, Object> caffeine) {
	CaffeineCacheManager cacheManager = new CaffeineCacheManager();
	cacheManager.setCaffeine(caffeine);
	return cacheManager;
	}
}
