# IDENTITY SERVICE - AirBNB Clone #

#### Doc Author: Sebastian Rengel Claros ####

#### Team: ####
- Erick Cuellar (Team Lead)
- Sebastian Rengel 
- Bruno Cerusoli
- Andres Quintanilla
- Freddy Espinosa

### Project Description ###
This is the Identity Micro-Service for the AirBNB Clone project
assigned to us as a team by Eng. Gary Franco
for the subject of Web Engineering III.

### Technologies Used ###
- Java 19
- Spring Boot 3.5.6
- JWT
- PostgreSQL (Database)

## API Docs ##
This API is documented using Swagger/OpenAPI.
To access the API Docs, run the application and 
navigate to /api/docs in your web browser.

### Migrations ###
Database migrations are managed using Flyway.
Although the Entity Manager uses hibernate.
To run the migration, proceed with these steps:
1. Execute the Application Once, so the Hibernate Engine
creates the tables  
2. Stop the application and activate this configuration
in the application.yml file:
```yml
  flyway:
    enabled: true
```

### Role and Claims system ###
this microservice implements a Role and Claims system
for the users, which can be used for authorization
in other microservices.
````
User -> Roles -> Claims
````

- A User can have multiple Roles
- A Role can have multiple Claims
- A Claim is a permission to perform an action
- The Claims are denoted by a string, with a format:
````
<resource>.<action> -> e.g user.create
````

### JWT Authentication ###
This microservice uses JWT for authentication.
The JWT is generated using a secret key

### API Standard Responses ###
The API follows a standard for most of the responses.
Very few exceptions apply. The only worth mentioning is
the authentication endpoint.


- For a response which contains a single object,
the **StandardResult<T>** wrapper is used
````
{
  "success": true,
  "errorMessage": "string",
  "data": {
    "id": 0,
    "name" : "Erick hermoso",
  }
}
````
- For a response which contains a list of objects,
the **PagedResponse<T>** wrapper is used
````
{
  "content": [
    {
      "id": 0,
      "name" : "Erick hermoso",
    }
  ],
  "pageNumber": 0,
  "pageSize": 0,
  "totalElements": 0,
  "totalPages": 0,
  "last": true,
  "errorMessage": "string",
  "success": true
}
````

