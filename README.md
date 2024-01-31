# ThreadVisio
## Introduction

ThreadVisio is a cloth shop website that allows users to generate clothes images based on their descriptions.

## ThreadVisio-server

The server receives different requests from different clients, some of the requests requires fetching/pushing data to the MongoDB database, which is connected to the server.

A possible front-end code is available at the following link: https://github.com/rogeazzam/ThreadVisio-client

## Getting Started

- In your project's root directory, create a new file named .env,
  then add a line that looks like this:
  MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>
  Replace <username>, <database> with your MongoDB Atlas cluster credentials, and then replace <password> with the actual generated password for your MongoDB user.
  Then, in a new line write JWT_SECRET and assign a secret password to it.
- In the terminal, navigate to the project directory and run the following command to install the required dependencies save in package.json: npm install
