# Blood Donation Management System

A **Blood Donation Management System** designed to manage donors, recipients, blood requests, and availability in an organized and efficient way. This project focuses on simplifying the blood donation workflow while keeping records accurate and easy to access.

<p align="center">
  <img src="./hero.png" alt="Blood Donation Management System Hero" width="100%" />
</p>



## Description

The **Blood Donation Management System** is designed to help blood banks, hospitals, or small organizations digitally manage blood donation activities.  
Instead of handling records manually, the system allows administrators to store, update, and retrieve information related to donors and blood availability quickly and reliably.

The project emphasizes clean structure, practical database usage, logical separation of features, and easy extensibility for future improvements.

## Features

| Feature | Description |
|------|------------|
| Donor Registration | Register new blood donors with personal and blood group details |
| Blood Group Management | Store and track available blood groups |
| Search Donors | Quickly search donors by blood group or other criteria |
| Blood Request Handling | Manage blood requests from recipients |
| Availability Tracking | View current availability of blood units |
| Admin Control | Centralized control for managing all records |
| Data Persistence | Secure storage of donor and request data |

## Tech Stack

- Programming Language: Python  
- Backend: Flask  
- Frontend: HTML, CSS  
- Database: SQLite  
- Architecture: MVC-style separation  

## Tools Used

- Visual Studio Code  
- Python Virtual Environment  
- Git & GitHub  
- Web Browser for testing  

## Dashboard Preview

<p align="center">
  <img src="./dashboard1.png" alt="Dashboard View 1" width="100%" />
</p>

<p align="center">
  <img src="./dashboard2.png" alt="Dashboard View 2" width="100%" />
</p>

<p align="center">
  <img src="./dashboard3.png" alt="Dashboard View 3" width="100%" />
</p>

<p align="center">
  <img src="./dashboard4.png" alt="Dashboard View 4" width="100%" />
</p>

<p align="center">
  <img src="./dashboard5.png" alt="Dashboard View 5" width="100%" />
</p>

<p align="center">
  <img src="./dashboard6.png" alt="Dashboard View 5" width="100%" />
</p>

<p align="center">
  <img src="./dashboard7.png" alt="Dashboard View 5" width="100%" />
</p>

<p align="center">
  <img src="./dashboard8.png" alt="Dashboard View 5" width="100%" />
</p>

## Project Structure
```text
blood-donation-management-system/
│
├── backend/
│   ├── venv/                  # Python virtual environment
│   ├── node_modules/          # Backend dependencies
│   ├── app.py                 # Backend entry point
│   ├── config.py              # Configuration settings
│   ├── models.py              # Database models
│   ├── routes.py              # API routes
│   ├── requirements.txt       # Python dependencies
│   └── package.json           # Backend npm configuration
│
├── frontend/
│   ├── node_modules/          # Frontend dependencies
│   ├── public/
│   ├── src/
│   │   ├── assets/            # Images and static assets
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Application pages
│   │   ├── services/          # API service handlers
│   │   ├── App.jsx            # Main React component
│   │   └── main.jsx           # Application entry point
│   ├── index.html             # HTML template
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.js         # Vite configuration
│   └── .env.example           # Environment variables example
│
├── database/
│   └── blood_donation.db     
│
├── README.md
└── .gitignore
```

# License
- MIT License
