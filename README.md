# 🐶 HTTP Response Code Image Finder

This project is a **full-stack web application** that allows users to **search, filter, save, and manage lists** of dog images based on HTTP response codes. The backend handles authentication, database storage, and dynamic filtering.

---

## **📌 Features**
- 🔑 User Authentication (Login/Signup) with JWT.
- 🔍 Search & Filter dog images by HTTP response codes.
- 📋 Save, edit, and delete filtered lists.
- 🗄️ Persistent storage using MongoDB.
- ⚡ Optimized queries for efficient performance.

---

## **🛠️ Tech Stack**
### **Frontend**
- React.js
- Bootstrap
- React-Router-Dom
- Axios for API requests

### **Backend**
- Node.js (Express.js)
- MongoDB (Mongoose ORM)
- JSON Web Tokens (JWT) for authentication

---

cd backend
npm install

cd app
npm install

🗄️ Database Setup

1️⃣ Install MongoDB (If not installed)
Download and install MongoDB from: MongoDB Official Site
Ensure MongoDB service is running.
2️⃣ Configure Environment Variables
Create a .env file in the backend folder and add the following;


💾 First-Time Database Initialization

When the backend starts for the first time, it checks if the database is empty. If empty, it automatically populates important data (response codes and image links).
To verify:

Run MongoDB (mongod service).
Start the backend server.
Open MongoDB Compass and check the database.

🏃 Running the Application

1️⃣ Start Backend
cd backend
npm run dev

2️⃣ Start Frontend
cd frontend
npm start

🚀 Open your browser and go to: http://localhost:3000



🛠️ Troubleshooting

MongoDB Connection Issue?
Ensure mongod is running (sudo systemctl start mongod on Linux).
Check MONGO_URI in .env.
Frontend Not Loading?
Run npm install again inside the frontend folder.
Restart the frontend (npm start).


📜 License

This project is licensed under the MIT License.

💡 Credits

Developed by Abhishek Chaudhary 🚀

