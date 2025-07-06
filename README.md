# 🛍️ DevCart — Developer Tools Marketplace

DevCart is a full-stack web application that allows developers to explore, share, like, and purchase useful dev tools. It features role-based access, image uploads, protected routes, and a responsive user interface.

## 🚀 Features

- 🔐 Authentication (JWT-based login & registration)
- 🧾 Add/Edit Developer Tools (Admins only)
- ❤️ Like System (auth protected)
- 🛒 Order/Purchase system with order history
- 🔍 Debounced search & tag-based filtering
- 🔁 Infinite scrolling
- 🛡️ Role-based access (User vs Admin)
- 📂 Cloudinary image uploads via multer
- 📊 Admin dashboard with tool/order overview

## 📦 Tech Stack

| Frontend       | Backend           | Others               |
| -------------- | ----------------- | -------------------- |
| React + Vite   | Node.js + Express | MongoDB + Mongoose   |
| Tailwind CSS   | REST API          | Cloudinary (uploads) |
| React Toastify | JWT + bcrypt      | React Router DOM     |

## 📂 Folder Structure

devcart-frontend/
├── components/
├── context/
├── pages/
├── App.jsx
├── main.jsx
└── …

devcart-backend/
├── controllers/
├── models/
├── routes/
├── middleware/
└── index.js

## 🔧 Installation

### Backend

```bash
cd devcart-backend
npm install
npm run dev
```

### Frontend

cd devcart-frontend
npm install
npm run dev

### ✍️ Short Description:

> Built a full-stack developer tools marketplace with role-based access, JWT authentication, image uploads, and infinite scrolling using React, Express, and MongoDB.

### ✍️ Long Description:

> Developed **DevCart**, a MERN-based web application where developers can browse, like, and purchase useful dev tools. The app features role-based access (admin/user), JWT authentication, cloud image uploads (Cloudinary), protected routes, debounced search, and infinite scroll. Also includes an admin dashboard to manage users, tools, and orders.
