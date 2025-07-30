Complaint Management System
A full-stack web application built with Next.js, TypeScript, and MongoDB that provides a robust platform for users to submit and track complaints, and for administrators to manage them efficiently.

Table of Contents
Features

Tech Stack

Project Structure

Getting Started

Prerequisites

Installation

Database Setup

Running the Application

API Endpoints

Environment Variables

Contributing

Features
User Authentication: Secure user registration and login system using JWT (JSON Web Tokens) and password hashing with bcrypt.

Role-Based Access Control:

User Dashboard: Allows users to submit new complaints, view their submission history, and track the status of each complaint.

Admin Dashboard: Provides administrators with a comprehensive overview of all submitted complaints, including statistics and tools for filtering, searching, and updating complaint statuses.

Complete Complaint Lifecycle Management:

Users can submit complaints with a title, description, category, and priority level.

Admins can view, edit, update the status (Open, In Progress, Resolved, Closed), and delete any complaint.

Responsive & Modern UI: A clean, responsive user interface built with Tailwind CSS and Shadcn/UI, ensuring a great user experience on all devices.

Dark Mode: Includes a theme toggle for switching between light and dark modes.

Toast Notifications: Provides user feedback for actions like successful logins or errors using sonner.

Tech Stack
Framework: Next.js (App Router)

Language: TypeScript

Database: MongoDB

Styling: Tailwind CSS

UI Components: Shadcn/UI

Authentication: JWT & bcrypt

State Management: React Hooks & Context API (useAuth)

API Layer: Next.js API Routes

Project Structure
A brief overview of the key directories in the project:

.
├── app/
│   ├── admin/             # Admin dashboard UI and logic
│   ├── api/               # Backend API routes
│   │   ├── auth/          # Authentication endpoints (login, register, verify)
│   │   └── complaints/    # CRUD endpoints for complaints
│   ├── auth/              # Frontend pages for login and registration
│   ├── complaints/        # User-facing pages for submitting and tracking complaints
│   └── dashboard/         # Main user dashboard
├── components/
│   ├── ui/                # Reusable UI components from Shadcn/UI
│   ├── auth-provider.tsx  # Auth context for managing user session
│   └── navigation.tsx     # Main application navigation bar
├── hooks/
│   └── use-auth.tsx       # Custom hook for accessing authentication context
├── lib/
│   ├── models/            # Database models for User and Complaint
│   ├── mongodb.ts         # MongoDB connection logic
│   └── jwt.ts             # JWT signing and verification logic
├── public/                # Static assets like images and SVGs
├── scripts/
│   └── seed-database.js   # Script to populate the database with initial data
├── .env.local             # Local environment variables (must be created)
└── package.json           # Project dependencies and scripts

Getting Started
Follow these instructions to set up and run the project on your local machine.

Prerequisites
Node.js (v18 or later recommended)

pnpm (as indicated by pnpm-lock.yaml)

A running MongoDB instance (either local or on a cloud service like MongoDB Atlas)

Installation
Clone the repository:

git clone [https://github.com/dhamankarYash/ComplaintManager.git](https://github.com/dhamankarYash/ComplaintManager.git)
cd ComplaintManager

Install dependencies using pnpm:

pnpm install

Database Setup
Connect to MongoDB: Make sure your MongoDB server is running. If you are using MongoDB Atlas, get your connection string.

Create a .env.local file: In the root of the project, create a new file named .env.local. Add the variables listed in the Environment Variables section.

(Optional) Seed the database: To populate your database with initial sample data (e.g., a default admin user), run the seed script:

node scripts/seed-database.js

Running the Application
Start the development server:

pnpm run dev

Open your browser and navigate to http://localhost:3000.

API Endpoints
The application's backend is powered by Next.js API Routes.

POST /api/auth/register: Register a new user.

POST /api/auth/login: Log in a user and receive a JWT.

GET /api/auth/verify: Verify a user's token.

GET /api/complaints: Fetch complaints (all for admins, user-specific for regular users).

POST /api/complaints: Submit a new complaint.

GET /api/complaints/[id]: Get a single complaint by its ID.

PUT /api/complaints/[id]: Update a specific complaint (admin only).

DELETE /api/complaints/[id]: Delete a specific complaint (admin only).

GET /api/admin/stats: Get complaint statistics for the admin dashboard.

Environment Variables
Create a .env.local file in the project root and add the following variables:

# Your MongoDB connection string
MONGODB_URI="your_mongodb_connection_string"

# A strong, secret key for signing JSON Web Tokens
JWT_SECRET="your_super_secret_and_long_jwt_key"

