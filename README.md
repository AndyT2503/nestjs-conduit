# Realword Conduit API: Nest + PostgreSQL + Onion Architecture

The onion architecture, introduced by Jeffrey Palermo in 2008. The main idea of this architecture is that the Domain Layer (Entities and Validation Rules that are common to the business case) is the Core of entire Application. In this project, I implement a variant of Onion Architecture with [NestJs](https://nestjs.com/).

## Development
1. Install [PostgreSQL](https://www.postgresql.org/download/)
2. Create new database in your local with whatever name you want.
3. Go to **.env** file and change the database connection config based on the database create in step 2.
4. Install all dependencies via `npm install`
5. Start project in **development watch mode** via `npm run start:dev`

## Project Structure:
![Onion Architecture](https://www.codewithmukesh.com/wp-content/uploads/2020/06/Onion-Architecture-In-ASP.NET-Core.png)

**Domain:**
- This layer contains entities, abstract of repository and constants.

**Infrastructure:** 
- This layer contains all things which are **infrastructure** of this project such as: connecting database (Typeorm config, Migration), Environment Config, Authentication Service...
- We implement repository for each entity in this layer. **Typeorm** already has its own repository but we define wrapper repository classes so it's easy to change other library if we want.

**Application:**
- Application layer will do the following tasks:
  1. Validate User Input.
  2. Handle business logic.
  3. Return data transfer objects (DTO) as a result of business logic.

**API:**
- Contains **controllers** of this apllication.
- It receives the requests made to the server and send it to services in **Application Layer** to execute some business logic.