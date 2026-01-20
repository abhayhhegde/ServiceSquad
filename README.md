# 🛠️ Service Squad

> **Your one-stop solution for reliable home services.**

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Status](https://img.shields.io/badge/Status-Active-success)
![Stack](https://img.shields.io/badge/Stack-React-61DAFB?logo=react&logoColor=black)
![Backend](https://img.shields.io/badge/Backend-Node.js-339933?logo=nodedotjs&logoColor=white)

---

## 📌 Overview

**Service Squad** is a full-stack web application that connects homeowners with skilled service providers.  
Whether you need an **electrician, plumber, carpenter, or mechanic**, Service Squad makes booking **easy, fast, and transparent**.

The platform supports a unique **Dual-Role System**, allowing users to act as both:
- **Customers** (booking services)
- **Service Providers** (offering services)

—all from a **single account**.

---

## 🚀 Key Features

### 🔐 Secure Authentication
- JWT-based authentication
- Protected routes for authorized access
- Secure session handling using LocalStorage

### 🛠️ Service Booking Platform
- Book services across categories:
  - Electrician
  - Carpenter
  - Plumber
  - Mason
  - Gardener
  - Mechanic
  - Painter
  - Janitor
- Real-time service request tracking

### 👥 Dual Role Ecosystem
- **User Mode**
  - Browse services
  - Book appointments
  - Track booking history
- **Provider Mode**
  - Create and manage provider profile
  - Set experience level
  - Accept or reject service requests

### 📊 Interactive Dashboard
- Separate dashboards for users and providers
- Booking status indicators:
  - 🟠 **Pending** – Request sent
  - ✅ **Accepted** – Provider confirmed
  - 🟢 **Completed** – Service finished
  - ❌ **Rejected** – Service declined

### 📧 Automated Notifications
- Email alerts using **Nodemailer**
- Notifications for:
  - Booking confirmation
  - Service completion
  - Cancellation updates

---

## 📂 Project Structure

The project follows a **component-based frontend** and a **modular backend** structure.

```text
Service-Squad/
├── backend/
│   ├── package.json          # Backend dependencies
│   └── server.js             # Server entry point (API, DB, Email logic)
│
├── frontend/
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── assets/           # Service images (plumber.png, mechanic.png, etc.)
│   │   ├── components/
│   │   │   ├── dashboard/    # Dashboard components (BookingForm, UserBookings)
│   │   │   ├── services/     # Service pages (Carpenter.js, Plumber.js, etc.)
│   │   │   ├── Login.js      # Login page
│   │   │   ├── SignUp.js     # Registration page
│   │   │   ├── HomePage.js   # Landing page
│   │   │   └── Header.js     # Navigation bar
│   │   ├── utils/
│   │   │   └── ProtectedRoute.js  # Route guard
│   │   ├── App.js            # Application routing
│   │   └── index.js          # Entry point
│   └── package.json          # Frontend dependencies
│
└── README.md
🛠️ Tech Stack
Component	Technology
Frontend	React.js, React Router, Axios, CSS3
Backend	Node.js, Express.js
Database	SQL (MySQL)
Authentication	JSON Web Tokens (JWT)
Email Service	Nodemailer

📦 Installation & Setup
Follow these steps to run the project locally.

1️⃣ Clone the Repository
bash
Copy code
git clone https://github.com/your-username/service-squad.git
cd service-squad
2️⃣ Backend Setup
bash
Copy code
cd backend
npm install
⚠️ Ensure your SQL database is running.
Update database credentials in server.js or configure them using a .env file.

Start the backend server:

bash
Copy code
node server.js
Backend runs at:
👉 http://localhost:5000

3️⃣ Frontend Setup
Open a new terminal:

bash
Copy code
cd frontend
npm install
npm start
Frontend runs at:
👉 http://localhost:3000

🤝 Contributing
Contributions are welcome!

Fork the repository

Create your feature branch

bash
Copy code
git checkout -b feature/NewFeature
Commit your changes

bash
Copy code
git commit -m "Add NewFeature"
Push to the branch

bash
Copy code
git push origin feature/NewFeature
Open a Pull Request

📄 License
Distributed under the MIT License.
See the LICENSE file for more information.