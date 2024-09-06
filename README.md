# Iprotego

This is an authenticated file uploader linked to a third party identity provider.
The developped solution builds upon the architecture schema 2b described in the initial project scoping document.
A mongo db database has been added in order to save documents relations to a user uploading it which was out of the scope of the project.

## Service list

The platform has been divided in multiple services here is a breakdown.

- MongoDB database (application data)
- PostgreSQL database (keycloak datas)
- Keycloak third party identity provider (JAVA)
- Iprotego API (NestJS)
- Iprotego app (NextJS)

## iprotego app

This repository contains the code related to the iprotego api user interface in order to upload files.

## iprotego api

This repository contains the code related to the iprotego api which handles presigned upload URL generation for a remote object storage solution (Google Storage/S3).

### Api End to end tests

- /customer (POST), register a mike user using an access token for the user
- /file (POST): Reject uploading a file in JPEG format without access token
- /file (POST): Reject uploading a file in JPEG format with invalid access token
- /file (POST): Upload a file in JPEG format with valid access token
- /file (GET): Get a paginated and sort filtered list of the current user uploaded files that have a total count of 1 file (1114 ms)
- /file (POST): Upload a file in PDF format with valid access token
- /file (GET): Get a paginated and sort filtered list of the current user uploaded files that have a total count of 2 files (1085 ms)
- /file (POST): Reject a file upload in PNG format with valid access token
- /file (POST): Reject a file upload in ICO format with valid access token

### APIs documentation

url: http://localhost:3000/swagger

Documentation is secured using basic authentication using the following credentials:
ID: swagger
PASSWORD: "123"

You can access it by going to the /swagger endpoint

## Third party identity provider (Keycloak)

Password policies:

- Uppercase Characters min 1
- Special Characters min 1
- Lowercase Characters min 1
- Digits min 1
- Minimum Length min 8

### Keycloak Admin console access

url: http://localhost:8080
admin username: protego-auth-admin
admin password: sNV69zUP2CTs

## Quick start (developement)

```bash
# for bind mount rights on the host
chown -R $USER ./iprotego
# build docker images
docker compose build
# start up the containers
docker compose up -d
# wait until all containers are healthy (might take few minutes on the first run - due to the initilization of databases)
docker ps
# open your browser and go to
http://localhost:3001
# when you are done and want to erase all data and containers
# docker rm -f $(docker ps -aq)
# docker system prune
# rm -rf keycloak_data mongo_data postgres_data api_data
```

## Tests

```bash
# for bind mount rights on the host
chown -R $USER ./iprotego
# build docker images
docker compose build
# run end to end tests as described above using sepecific docker-compose file in detach mode
docker compose -f ./docker-compose.e2e.yml up -d
# wait until all containers are healthy (might take few minutes on the first run - due to the initilization of databases)
docker ps
# change to the api directory
cd api
# install dependencies
npm i
# Running the tests
npm run test:e2e
# when you are done and want to erase all data and containers
# docker rm -f $(docker ps -aq)
# docker system prune
# rm -rf keycloak_data mongo_data postgres_data
```

## Docker

For ease of use and skills demonstration purposes :

A [docker compose file](./docker-compose.yml) is present in the repository and allows to start up api and user interface easily.

A github workflow pipeline allow executing the end to end tests to the pipeline.

## Features

- [Requirement] Authentication/autorization system using JWT
- [Requirement] File Upload for connected user
- [Requirement] Sign in
- [Requirement] Sign up with strong password
- [Bonus] Not implemented in the frontend: maintain a fetch a list of the authenticated user owned documents
- [Bonus] Authentication/autorization system implemented using an Oauth2/OpenID Connect third party provider
- [Bonus] Theming using Iprotego main UI chart
- [What we could do easily without any added code] Users email validation flow
- [What we could do easily without any added code] Third party authentification provider identity federation using Microsoft Entra ID, Facebook SSO, Google SSO provider...
