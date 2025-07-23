# Byahe API

**Byahe API** is a backend service built using **NestJS**, designed for scalable and secure transportation or travel-related systems. It supports user authentication, file uploads, and RESTful endpoints, and integrates with MySQL and Sequelize ORM.

---

## 🛠️ Tech Stack

- **NestJS 11**
- **TypeScript**
- **Sequelize & Sequelize-Typescript**
- **MySQL**
- **JWT Authentication** with Passport
- **Swagger/OpenAPI**
- **Class Validator + Transformer**
- **Multer** for file uploads
- **Dotenv** for environment configuration
- **ESLint + Prettier**
- **Jest** for testing

---

## 📁 Project Structure

Follows NestJS modular structure. Key modules include:

```
src/
├── activity/       # Handles user activities such as bookings and scheduled plans
├── auth/           # Authentication and authorization logic (JWT, login, register)
├── document/       # Manages user-uploaded travel documents (e.g. passport, visa)
├── flight/         # Flight-related modules: search, booking, and management
├── hotel/          # Hotel-related modules: availability, booking, and details
├── itinerary/      # Generates and stores user itineraries and trip plans
├── lib/            # Shared utilities, constants, and configuration files
├── payment/        # Payment gateway integration and transaction processing
├── types/
│   └── enum/       # Enum definitions used throughout the app
└── user/           # User profile management and related features

```

---

## 🔐 Authentication

- JWT-based login with Passport
- Password hashing via Bcrypt
- Local strategy for credential-based auth

---

## 🧪 Scripts

| Command            | Description                      |
|--------------------|----------------------------------|
| `npm run start`    | Run the app                      |
| `npm run start:dev`| Run in watch mode                |
| `npm run build`    | Compile TypeScript               |
| `npm run test`     | Run unit tests                   |
| `npm run test:watch`| Watch mode testing              |
| `npm run test:e2e` | Run end-to-end tests             |
| `npm run lint`     | Run ESLint                       |
| `npm run format`   | Format code with Prettier        |

---

## 📘 API Documentation

Once running, open Swagger UI at:

```
http://localhost:3000/swagger
```

Powered by `@nestjs/swagger`.

---

---

## 📦 Deployment & Env

- Configure your `.env` file:
```env
PORT=

SQL_HOST=
SQL_PORT=
SQL_USERNAME=
SQL_PASSWORD=
SQL_DATABASE=

DOCUMENT_DIRECTORY=

JWT_SECRET=
```

---


## 🚧 Status

⚠️ This project is no longer maintained.

---
