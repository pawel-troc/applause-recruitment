# applause-recruitment
App made for recruitment process for Applause

## Description
This app is a simple matcher. It takes criteria (country codes and devices) selected by user and perform a search in database taking into account criterias passed. The result is a list of testers matching mentioned criteria. Data comes from in-memory database filled up from csv files, which are included in repository.

## Technologies used
backend (api)
* Java 11
* Spring Boot 2.4.1 RELEASE
* H2 in-memory database
* Liquibase
* Lombok
* JUnit 5

frontend (client)
* Angular 8
* Bootstrap 4
* Karma & Jasmine

## Runninng an app
Application is using docker and docker-compose to spool up containers, so make sure you have them installed.
Either clone or download code as a zip, go to main directory where docker-compose.yml file is located. Then use
```
docker-compose up
```
via terminal to start up containers. Wait until docker-compose finish its task and then open browser of your choice (Internet Explorer is not supported) and head to
```
localhost:4200
```
You should see main page where you can select criteria for country codes and devices. Both of them are necessary to perform a search. After clicking **Search** button you should receive list of testers matching criteria or message that none of testers matched criterias.

