# JobSprint – Online Job Portal

## Overview

JobSprint is a full-stack online job portal designed to bridge the gap between job seekers and recruiters. The platform provides a seamless recruitment experience by enabling students to search and apply for jobs while allowing recruiters to manage companies, post job openings, and review applicants.

The application features secure authentication, role-based access control, real-time communication, and a modern responsive user interface.

---

## Features

### Student Module

* User Registration and Login
* Browse Available Jobs
* Search and Filter Jobs
* Save Jobs for Later
* Apply for Jobs
* View Applied Jobs
* Update Profile Information
* Upload Profile Picture

### Recruiter Module

* Recruiter Authentication
* Add and Manage Companies
* Edit Company Details
* Post New Job Openings
* Manage Posted Jobs
* View Applicants
* Update Applicant Status

### Additional Features

* JWT-Based Authentication & Authorization
* Role-Based Access Control
* Real-Time Chat using Socket.IO
* Cloudinary Image Upload Integration
* Responsive User Interface
* Secure REST APIs
* Redux State Management

---

## Tech Stack

### Frontend

* React.js
* Material UI (MUI)
* Redux Toolkit
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Authentication & Security

* JSON Web Token (JWT)
* bcrypt.js

### Cloud Services

* Cloudinary

### Real-Time Communication

* Socket.IO

---

## System Modules

### Student

* Register/Login
* Search Jobs
* Save Jobs
* Apply for Jobs
* Track Applications
* Manage Profile

### Recruiter

* Manage Companies
* Post Jobs
* View Applicants
* Manage Applications

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd JobSprint
```

### Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Configure Environment Variables

Create a `.env` file in the backend directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Run Application

Backend:

```bash
npm run dev
```

Frontend:

```bash
npm run dev
```

---

## Project Highlights

* Full-Stack MERN Application
* Real-Time Chat Functionality
* Role-Based Authentication System
* Recruiter & Student Dashboards
* Cloud-Based Image Storage
* Modern Responsive UI using Material UI
* Scalable RESTful API Architecture

---

## Future Enhancements

* Resume Builder
* AI-Based Job Recommendations
* Email Notifications
* Video Interview Integration
* Advanced Analytics Dashboard

---

## Author

**Shrinath Adhav**

MCA Graduate | Full Stack Developer

Skills: React.js, Node.js, Express.js, MongoDB, MySQL, JavaScript, Python
