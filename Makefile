include .env

.PHONY: services
services:
	docker-compose -f docker-compose.services.yml up

.PHONY: services-down
services-down:
	docker-compose -f docker-compose.services.yml down -v

.PHONY: psql
psql:
	docker-compose -f docker-compose.services.yml exec db psql -U ${DB_USER}
