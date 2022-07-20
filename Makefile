IMAGE_NAME = crypto-backend-service
EXPOSED_PORT = 3000

build: ##@development build image
	docker-compose build

run: ##@development run image
	docker-compose up

down: ##@development stop image
	docker-compose down
