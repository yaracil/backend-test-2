# backend-test-2

### Technologies
- Spring-Boot, Eureka, Feign, Zuul Api Gateway, JPA, Flyway, Docker, Docker-compose, React, Tabler Theme, MySQL

### Dev Running Instructions
1. Open build.gradle in IntelliJ.
2. Install Gradle dependencies.
3. Turn on Docker Application.
4. Run docker-compose up to turn on server.
5. cd front-end/
6. Run yarn to install JavaScript dependencies.
7. Run yarn start to run front-end app.

### Authentication
#### Admin User (Can manage orders and items)
- user: admin@test.com
- password: 1234

#### Client User (Can manage only his orders)
- user: client@test.com
- password: 1234

### Functionalities
- Items CRUD
- Orders CRUD
- User Register
- User Authentication
- Microservice architecture
- Front-end client in React
- Backend in Docker container 