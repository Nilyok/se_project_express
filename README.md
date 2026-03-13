# 🌤 WTWR — What To Wear?

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)

🎓 **TripleTen Software Engineering Program**  
📦 **WTWR Full-Stack Application — Projects 13, 14, 15**

WTWR (**What To Wear?**) is a full-stack web application that helps users manage clothing items and decide what to wear based on weather conditions.

The application includes:

• A **React frontend**  
• A **Node.js + Express backend API**  
• A **MongoDB database**  
• **JWT authentication and protected routes**  
• **Cloud deployment with NGINX and PM2**

---

# 🌐 Live Application

### Frontend Application  
https://www-magnum-cloud.duckdns.org

### Backend API  
https://api-magnum-cloud.duckdns.org

### Frontend Repository  
https://github.com/Nilyok/se_project_react

### Project Pitch Video  
<!-- https://www.loom.com/share/cedb848c6e6f4595a3b2b40e2e0ab635 replace link after record video -->

---

# 🔗 Project Links

### Frontend Repository  
https://github.com/Nilyok/se_project_react

### Project Pitch Video  
https://www.loom.com/share/cedb848c6e6f4595a3b2b40e2e0ab635

---

# 🧠 Project Overview

This project was developed across **three sprints** in the TripleTen Software Engineering Program.

| Project | Focus | Description |
|-------|-------|-------------|
| **Project 13** | Backend | Built REST API with authentication and authorization |
| **Project 14** | Frontend | Developed React UI with API integration |
| **Project 15** | Deployment | Deployed application to a cloud server |

Together these components form a **production-style full-stack application**.

---

# 🛠 Tech Stack

## Frontend
- React
- Vite
- JavaScript (ES6+)
- CSS Modules
- REST API integration

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt password hashing

## Deployment
- Google Cloud Virtual Machine
- NGINX reverse proxy
- PM2 process manager
- DuckDNS domain

---

# 🔐 Authentication System

Users can:

• Sign up  
• Log in securely  
• Receive a **JWT token valid for 7 days**

Protected routes require:

```
Authorization: Bearer <token>
```

Authentication protects:

• profile routes  
• clothing item creation  
• item deletion  

---

# 👕 Clothing Item Management

Users can manage clothing items including:

• Creating clothing items  
• Viewing clothing items  
• Deleting clothing items  

Ownership protection ensures:

✔ Only the **owner of a clothing item** can delete it.

---

# 📦 API Endpoints

## Public Routes

| Method | Endpoint | Description |
|------|------|-------------|
POST | `/signup` | Register a new user |
POST | `/signin` | Login and receive JWT |
GET | `/items` | Get clothing items |

---

## Protected Routes

Require authentication.

| Method | Endpoint | Description |
|------|------|-------------|
GET | `/users/me` | Get current user profile |
PATCH | `/users/me` | Update user profile |
POST | `/items` | Create clothing item |
DELETE | `/items/:id` | Delete clothing item (owner only) |

---

# 🗄 Database

The project uses **MongoDB** with **Mongoose schemas**.

Collections include:

• users  
• clothingItems  

Local database connection:

```
mongodb://localhost:27017/wtwr_db
```

---

# ⚙ Running the Project Locally

## 1️⃣ Clone repositories

Frontend

```
git clone https://github.com/Nilyok/se_project_react.git
```

Backend

```
git clone https://github.com/Nilyok/se_project_express.git
```

---

## 2️⃣ Install dependencies

Frontend

```
npm install
```

Backend

```
npm install
```

---

## 3️⃣ Start MongoDB

```
mongod
```

---

## 4️⃣ Start backend server

```
npm run dev
```

Backend server runs on:

```
http://localhost:3001
```

---

## 5️⃣ Start frontend

```
npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

---

# 🚀 Deployment (Project 15)

The WTWR application is deployed using:

• **Google Cloud Virtual Machine**  
• **NGINX reverse proxy**  
• **PM2 process manager**  
• **DuckDNS domain**

This allows the application to run continuously and be publicly accessible on the internet.

---

# 💡 Key Concepts Practiced

| Concept | Description |
|------|-------------|
REST API Design | Structured API architecture |
Authentication | JWT login system |
Authorization | Protected routes |
Database Modeling | MongoDB + Mongoose |
Frontend Integration | React + API communication |
Cloud Deployment | VM hosting with NGINX |
Process Management | PM2 for server reliability |

---

# ✨ Reflection

Through this project I learned how to build and deploy a **complete full-stack application**.

Key skills gained include:

• Building secure REST APIs  
• Implementing JWT authentication  
• Creating a React frontend with protected routes  
• Connecting frontend and backend services  
• Deploying applications to a cloud server  
• Configuring NGINX and PM2 for production environments  

This project represents a major step toward building **production-ready web applications**.

---

# 👨‍💻 Author

Chanoknun **“Magnum”** Nilyok  

TripleTen Software Engineering Program  

Projects **13 • 14 • 15**
