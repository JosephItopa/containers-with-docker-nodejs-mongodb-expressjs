##  Project: Containers with Docker 

#### Technologies Used: 

- Docker
- Nodejs
- MongoDB
- MongoExpress

#### Project Description:

- Create Dockerfile for Nodejs application and build Docker image
- Run Nodejs application in Docker container and connect to MongoDB database container locally.
- Also run MongoExpress container as a UI of the MongoDB database.

#### How to Containerize the Application
##### initialize npm
- npm init -y
##### install modules so that package-lock.json is created
- npm install express
##### build the container with tag 'alpine-node-app' 
- docker build -t alpine-node-app .
##### Run the container on port 3000, and accessed on browser via port 8080
- docker run -d -p 8080:3000 --name node-app alpine-node-app
##### View the logs
- docker logs -f node-app
##### To Stop and Remove the docker image
- docker stop node-app && docker rm node-app
##### To test the app use the following url below
- http://127.0.0.1:8080
- http://127.0.0.1:8080/api/v1/health

##### NB: Any changes in the app.js or Dockerfile, ensure to rebuild the container.

#### Two Golden Rules for package-lock.json

- Never edit it manually.
- Commit it to Git.

##### Credit: TechWorld with Nana