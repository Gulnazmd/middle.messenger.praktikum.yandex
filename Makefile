deploy:
	docker build -t app .
	heroku container:push web
	heroku container:release web
	heroku open