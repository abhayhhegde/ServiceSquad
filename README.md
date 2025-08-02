# Service Squad – Home Services Provider Platform

**Service Squad** is a full-stack web application that connects users with skilled home service providers like electricians, plumbers, carpenters, and more. The platform allows users to book services, track progress, and also register themselves as service providers. It includes secure authentication, a dual-role system, a real-time dashboard, and automated email notifications.

---

## 🚀 Features

- 🔐 **User Authentication**
  - JWT-based login system with local storage
  - Protected routes for accessing service functionalities

- 🛠️ **Service Booking Platform**
  - Users can book services like:
    - Electrician, Carpenter, Mason, Plumber
    - Gardener, Janitor, Painter, Mechanic
  - View and track status of bookings

- 👥 **Dual Role System**
  - Users can register as **service providers**
  - Providers submit:
    - Service type
    - Experience details
    - Profile image

- 📊 **Dashboard**
  - Separate views for users and providers
  - Toggle to switch between roles
  - Cards with status indicators:
    - 🟠 Pending
    - ✅ Accepted
    - ❌ Rejected
    - 🟢 Completed

- 📧 **Email Notifications (via Nodemailer)**
  - Notification sent to users and providers when:
    - A service is booked
    - A service is completed
    - A service is cancelled

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Axios
- **Backend:** Node.js, Express.js
- **Database:** SQL
- **Auth:** JWT with localStorage
- **Email Service:** Nodemailer

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/service-squad.git
   cd service-squad
