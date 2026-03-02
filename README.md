# Airbnb Clone - Microservices Architecture

A scalable, full-stack Airbnb clone built to demonstrate modern software architecture. This project implements a Microservices Architecture using Java Spring Boot, following Domain-Driven Design (DDD) and Clean Architecture principles. 

It handles secure routing via an APISIX API Gateway, asynchronous communication with Apache Kafka, and media management through Cloudinary.

## Architecture Overview

The system is designed to be highly scalable, maintainable, and secure. Internal microservices are not exposed directly to the outside world; instead, all traffic flows through an API Gateway.

### Key Architectural Decisions:
- **API Gateway Pattern**: Apache APISIX acts as the single entry point. It handles JWT validation and routing, stripping the complexity of authentication from the underlying microservices.
- **Stateless Microservices**: Services receive trusted `X-User-Id` headers injected by the Gateway, ensuring secure and decoupled authorization.
- **Domain-Driven Design (DDD)**: Each microservice is strictly divided into Domain, Application, Infrastructure, and Presentation layers.
- **Event-Driven Communication**: Kafka is used for decoupled, asynchronous communication between services (e.g., triggering notifications or updating availability when a listing is booked).

## Microservices

| Service | Description | Port |
|---------|-------------|------|
| **API Gateway (APISIX)** | Routes requests, validates JWT tokens, and injects user headers. | `9080` |
| **Identity Service** | Handles user registration, login, and generates JWTs. | `8081` |
| **Listings Service** | Manages properties, hosts, amenities, and Cloudinary image uploads. | `8082` |
| **Frontend App** | Angular/Web3 client consuming the gateway APIs. | `4200` |

## Tech Stack

### Backend
* **Framework**: Java 17, Spring Boot 3.x
* **Architecture**: Microservices, DDD, Clean Architecture
* **Database**: PostgreSQL (Relational Data)
* **Migrations**: Flyway
* **Messaging**: Apache Kafka
* **Security**: JWT (JSON Web Tokens)

### Infrastructure & DevOps
* **API Gateway**: Apache APISIX
* **Containerization**: Docker & Docker Compose
* **Media Storage**: Cloudinary

### Frontend
* **Framework**: Angular / TypeScript

## DDD Folder Structure (Per Microservice)

Each microservice follows a strict Domain-Driven Design layout. For example, the Listings Service:

```text
src/main/java/com/airbnbclone/listings/
├── domain/            # Core business logic, Entities, Aggregate Roots, Domain Exceptions
├── application/       # Use Cases, DTOs, Application Services (ListingApplicationService)
├── infrastructure/    # DB Adapters, JPA Entities, Flyway, Cloudinary Integration, Kafka Producers
└── presentation/      # REST Controllers, Global Exception Handlers
```

## Prerequisites

Before you begin, ensure you have the following installed:
- Docker and Docker Compose
- Java 17+
- Maven
- Node.js & Angular CLI (for the frontend)
- A Cloudinary account for image uploads

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/airbnb-clone-microservices.git
cd airbnb-clone-microservices
```

### 2. Set up Environment Variables
Create a `.env` file in the root directory and add your credentials:

```env
# Cloudinary Keys
CLOUDINARY_URL=cloudinary://<API_KEY>:<API_SECRET>@<CLOUD_NAME>

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_for_signing_tokens

# Database
DB_USER=postgres
DB_PASSWORD=postgres
```

### 3. Run the Infrastructure (Docker)
Start the databases, Kafka, Zookeeper, and APISIX Gateway using Docker Compose:

```bash
docker-compose up -d
```
*Note: Flyway will automatically run database migrations upon service startup.*

### 4. Run the Microservices
You can run each microservice independently via Maven:

```bash
# Terminal 1: Identity Service
cd services/identity-service
mvn spring-boot:run

# Terminal 2: Listings Service
cd services/listings-service
mvn spring-boot:run
```

## Core API Endpoints

All external requests must go through the APISIX Gateway (`http://localhost:9080`).

### Identity
* `POST /api/auth/register` - Register a new user
* `POST /api/auth/login` - Login and receive JWT

### Listings
*(Requires JWT Token in `Authorization: Bearer <token>` header)*
* `GET /api/listings` - Fetch all listings (supports query filters like `?category=beach`)
* `GET /api/listings/{id}` - Fetch listing details
* `POST /api/listings` - Create a new listing (Host only)
* `POST /api/listings/{id}/images` - Upload property images via Cloudinary

## Contributing
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.
