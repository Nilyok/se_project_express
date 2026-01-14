# 🚀 WTWR Backend – Project 13

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)

🎥 **Demo (API Walkthrough)**  
👉 https://www.loom.com/share/cedb848c6e6f4595a3b2b40e2e0ab635

> 🧩 Project 13 — TripleTen Software Engineering Program

WTWR Backend is a secure server-side REST API built with Node.js, Express, and MongoDB.
This sprint extends the previous backend by implementing authentication, authorization, and protected routes using JWT.

---

## 🧠 About the Project

Project 13 focuses on user authentication and access control.
The backend now supports user registration, login with JSON Web Tokens, protected routes, and ownership-based permissions for clothing items.

The API ensures that:

• Passwords are securely hashed
• Only authenticated users can modify protected resources
• Users cannot delete items owned by others

---

## 🎨 Project Features

✅ **User Authentication** — Sign up and sign in using email & JWT issued on successful login (expires in 7 days)
✅ **Authorization Middleware** — Protects all routes except: POST /signup, POST /signin, GET /items
✅ **REST API Endpoints** Users & clothing item management
✅ **MongoDB + Mongoose Models** — Structured schemas with validation
✅ **Ownership-Based Permissions** — Only item owners can delete their items
✅ **Centralized Error Handling** — Validation, authorization, not found, and server errors
✅ **ESLint (Airbnb Base) + Prettier** — Clean, consistent, professional code style
✅ **CORS Configured** — Ready for frontend integration
✅ **Local MongoDB** — Connected at mongodb://localhost:27017/wtwr_db


---

## 💡 Key Concepts Practiced

| Concept | Description |
|----------|-------------|
| **REST API Design** | Design	Built structured, resource-based endpoints |
| **Express.js** | Controllers	Separated logic into clean controller files |
| **Mongoose Schemas** | Created user & item models with validation |
| **Error Handling** | Middleware	Implemented centralized error responses |
| **Routing Structure** | Used separate route files for clarity |
| **Linting (Airbnb)** | Wrote standardized, professional-quality code |

---

## ✨ Reflection

This project strengthened backend development skills by teaching how to:
• Implement secure authentication with JWT
• Protect routes using authorization middleware
• Enforce ownership and access control
• Safely store and hide sensitive user dat
• Structure a scalable Express application
• Follow professional linting and formatting standards
• Test secured APIs using Postman
Completing Project 13 represents a major step toward building production-ready backends with real-world security practices.

---

🧑‍💻 Created by: Chanoknun “Magnum” Nilyok
📅 TripleTen Software Engineering Program
📦 Project 13 — WTWR Backend (Authorization & Security)
