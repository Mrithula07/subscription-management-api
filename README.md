# 📩 Subscription Management System API

A robust and production-ready RESTful API that lets users manage subscriptions securely and intelligently. Built using **Node.js**, **Express**, and **MongoDB**, the system includes advanced features like **JWT authentication**, **email reminders**, **rate limiting**, and more — optimized for real-world usage.

---

## 🚀 Live Demo

🔗 [API Base URL (Render)](https://subscription-management-api-0tww.onrender.com)  
🔗 [Swagger API Documentation](https://subscription-management-api-0tww.onrender.com/api-docs)

---

## ⚙️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB & Mongoose**
- **JWT Authentication**
- **Upstash QStash** (for scheduled workflows)
- **Arcjet** (rate-limiting & bot protection)
- **Swagger** (API documentation)

---

## 🧠 Features

✅ **User Authentication** – Sign up, sign in, sign out with JWT  
✅ **Subscription Management** – Create, update, delete, cancel subscriptions  
✅ **Upcoming Renewals** – Auto-fetch renewals in the next 7 days  
✅ **Email Notifications** – Scheduled reminders using Upstash workflows  
✅ **Role-Based Authorization** – Route protection with middleware  
✅ **Rate Limiting and Bot Protection with Arcjet** – Secure public APIs from abuse  
✅ **Swagger UI** – Interactive API documentation  
✅ **Global Error Handling** – Consistent error responses  
✅ **Clean Architecture** – MVC structure with route separation

---

## 📂 Project Structure

```
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── .env / .env.production
├── app.js
├── package.json
└── README.md
```

---

## 🧪 API Reference

View interactive API docs at:  
🔗 [Swagger UI](https://subscription-management-api-0tww.onrender.com/api-docs)

---

## 🔐 Authentication

After signing in, use the JWT token in your request headers:

```
Authorization: Bearer <your_token>
```

---

## 📦 Getting Started Locally

### 1️⃣ Clone the repo

```bash
git clone https://github.com/Mrithula07/subscription-management-api.git
cd subscription-management-api
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env` file

```env
PORT=5500
NODE_ENV=development
SERVER_URL=http://localhost:5500

DB_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

MAIL_PASSWORD=your_email_password

QSTASH_URL=https://qstash.upstash.io
QSTASH_TOKEN=your_upstash_token
QSTASH_CURRENT_SIGNING_KEY=your_current_key
QSTASH_NEXT_SIGNING_KEY=your_next_key

ARCJET_KEY=your_arcjet_key
```

### 4️⃣ Run the server

```bash
npm run dev
```

---


## 👩‍💻 Author

**Mrithulasree Nainar**  
📧 Email: mrithula04@gmail.com  
💼 GitHub: [Mrithula07](https://github.com/Mrithula07)

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
