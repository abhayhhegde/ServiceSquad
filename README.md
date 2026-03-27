# ServiceSquad

> A full-stack marketplace connecting homeowners with skilled service providers.

![Status](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/Frontend-React_18-61DAFB?logo=react&logoColor=black)
![Node](https://img.shields.io/badge/Backend-Node.js-339933?logo=nodedotjs&logoColor=white)
![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?logo=mysql&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

---

## Overview

ServiceSquad lets users book home services (electrician, plumber, carpenter, and more) and also register as a service provider — all from a single account. The platform handles the full booking lifecycle with email notifications at each status change.

---

## Features

- **Authentication** — JWT-based login/signup with protected routes and auto token refresh
- **Service Booking** — Browse providers by category, submit requests with date, address, and description
- **Dual-Role System** — Any user can register as a provider and manage incoming service requests
- **Booking Lifecycle** — Pending → Accepted → Completed / Cancelled, with email notifications at each step
- **Dashboard** — Separate views for tracking bookings as a customer and managing requests as a provider
- **Provider Profiles** — Register with experience level, contact details, and a profile photo

### Supported Service Categories

Electrician · Plumber · Carpenter · Mason · Painter · Mechanic · Gardener · Janitor

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6, Axios, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MySQL (mysql2/promise, connection pooling) |
| Auth | JWT (jsonwebtoken), bcrypt |
| Validation | express-validator |
| Email | Nodemailer |
| Security | Helmet, CORS, express-rate-limit |
| Logging | Winston |

---

## Project Structure

### Backend

```
backend/
├── 📁 config
│   ├── 🟨 db.js              # MySQL connection pool + table initialisation
│   ├── 🟨 env.js             # Environment variable validation (fail-fast)
│   └── 🟨 logger.js          # Winston logger
├── 📁 controllers
│   ├── 🟨 authController.js
│   ├── 🟨 bookingController.js
│   └── 🟨 providerController.js
├── 📁 logs
├── 📁 middleware
│   ├── 🟨 auth.js            # JWT verification
│   ├── 🟨 errorHandler.js    # Global error handler
│   └── 🟨 validation.js      # Request validation rules
├── 📁 routes
│   ├── 🟨 authRoutes.js
│   ├── 🟨 bookingRoutes.js
│   └── 🟨 providerRoutes.js
├── 📁 services
│   └── 🟨 emailService.js    # Nodemailer email notifications
├── 📁 utils
│   └── 🟨 constants.js       # Shared constants (service types, etc.)
├── 🗂️ package-lock.json
├── 🗂️ package.json
└── 🟨 server.js              # Express entry point
```

### Frontend

```
frontend/
├── 📁 public
│   ├── 📄 index.html
│   ├── 🖼️ logo.png
│   ├── 🗂️ manifest.json
│   └── 📄 robots.txt
├── 📁 src
│   ├── 📁 api
│   │   └── 🟨 client.js      # Centralised Axios instance with interceptors
│   ├── 🟨 App.js
│   ├── 📁 assets
│   │   ├── 🖼️ carpenters.png
│   │   ├── 🖼️ electrician.png
│   │   ├── 🖼️ gardener.png
│   │   ├── 🖼️ janitor.png
│   │   ├── 🖼️ mason.png
│   │   ├── 🖼️ mechanic.png
│   │   ├── 🖼️ painter.png
│   │   └── 🖼️ plumber.png
│   ├── 📁 components
│   │   ├── 🟨 About.js
│   │   ├── 🟨 Become.js
│   │   ├── 🟨 Contact.js
│   │   ├── 📁 dashboard
│   │   │   ├── 🟨 BookingForm.js
│   │   │   ├── 🟨 Dashboard.js
│   │   │   ├── 🟨 ProviderBookings.js
│   │   │   └── 🟨 UserBookings.js
│   │   ├── 🟨 Footer.js
│   │   ├── 🟨 Header.js
│   │   ├── 🟨 HomePage.js
│   │   ├── 🟨 Layout.js
│   │   ├── 🟨 Login.js
│   │   ├── 🟨 ServicePage.js
│   │   ├── 📁 services
│   │   │   └── 🟨 ServiceProviderList.js
│   │   ├── 🟨 SignUp.js
│   │   └── 📁 ui
│   │       ├── 🟨 EmptyState.js
│   │       ├── 🟨 LoadingSkeleton.js
│   │       ├── 🟨 ProviderCard.js
│   │       ├── 🟨 SectionHeader.js
│   │       ├── 🟨 StatusBadge.js
│   │       └── 🟨 Toast.js
│   ├── 📁 context
│   │   └── 🟨 AuthContext.js  # Global auth state
│   ├── 🎨 index.css           # Tailwind directives + global styles
│   ├── 🟨 index.js
│   └── 📁 utils
│       └── 🟨 ProtectedRoute.js
├── 🗂️ package-lock.json
├── 🗂️ package.json
├── 🟨 postcss.config.js
└── 🟨 tailwind.config.js
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MySQL 8+

### 1. Clone the repository

```bash
git clone https://github.com/abhayhhegde/ServiceSquad.git
cd ServiceSquad
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=5000
CORS_ORIGIN=http://localhost:3000

# Database
DB_HOST=localhost
DB_NAME=service_provider_db
USER_NAME=your_mysql_username
PASSWORD=your_mysql_password

# JWT
JWT_SECRET=your_jwt_secret_key

# Email (Nodemailer)
EMAIL=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

> The database tables are created automatically on first startup. No manual migration needed.

Start the backend:

```bash
npm run dev      # development (nodemon)
npm start        # production
```

Backend runs at `http://localhost:5000`
Health check: `GET /health`

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:

```env
REACT_APP_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm start
```

Frontend runs at `http://localhost:3000`

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register a new user |
| POST | `/login` | Login and receive JWT |
| GET | `/check-email` | Check if email is already registered |

### Providers
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/become-provider` | Register as a service provider | Required |
| GET | `/providers/:serviceType` | Get all providers for a service category | — |

### Bookings
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/bookings` | Create a new booking | Required |
| GET | `/bookings/user` | Get all bookings for the logged-in user | Required |
| GET | `/bookings/provider` | Get all service requests for the logged-in provider | Required |
| PUT | `/bookings/:id/status` | Update booking status | Required |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request against `main`

---

## License

Distributed under the MIT License.
