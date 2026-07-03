# 📚 Library Management System

A full-stack Library Management System that allows users to browse books, view book details, request rentals, and manage their profiles. Administrators can manage books, users, rental status, and book cover images through a centralized dashboard.

## 🚀 Features

### 👤 User Features

* User Registration and Login
* Secure Authentication
* Profile Management
* Browse Available Books
* View Detailed Book Information
* Request Book Rentals
* Receive Email Confirmation for Rental Requests

### 📖 Book Management

* Add New Books
* Delete Books
* Upload Book Cover Images
* View Book Inventory
* Track Rental Status
* Search and Browse Collection

### 🛠️ Admin Features

* View All Registered Users
* Block/Unblock Users
* Delete Users
* Manage Book Inventory
* Monitor Rental Requests

### 📧 Email Notifications

* Automated rental request confirmation emails
* Gmail SMTP integration using Nodemailer

---

## 🏗️ Tech Stack

### Frontend

* React.js
* Axios
* CSS3

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Additional Packages

* Multer (Image Uploads)
* Nodemailer (Email Service)
* CORS
* Dotenv
* Body Parser

---

## 📂 Project Structure

```bash
Library-Management-System/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── assets/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── server.js
│
└── README.md
```

---


## 🔐 User Authentication

Users can:

* Register
* Login
* Update Profile
* Access Book Inventory

Administrators can:

* Block Users
* Unblock Users
* Delete Users

---

## 📬 Rental Request Workflow

1. User selects a book.
2. Clicks **Rent Book**.
3. Request is sent to the backend.
4. Confirmation email is delivered automatically.
5. Rental status can be managed by administrators.

---

## 🌐 Hosted Link

🔗 https://library-azure-chi.vercel.app/



## 👨‍💻 Author

**Jinu J Saju**

B.Tech Computer Science & Engineering
Mar Baselios College of Engineering and Technology, Trivandrum

---

