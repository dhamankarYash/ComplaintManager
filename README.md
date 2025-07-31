# 🎯 Complaint Management System

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
</div>

<div align="center">
  <h3>🚀 A full-stack complaint management platform built for efficiency and scalability</h3>
  <p>Streamline complaint handling with role-based dashboards, real-time notifications, and comprehensive tracking capabilities.</p>
</div>

<div align="center">
  <a href="https://complaint-manager-seven.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🌐 Live Demo-View App-blue?style=for-the-badge" alt="Live Demo">
  </a>
  <a href="https://www.loom.com/share/1ce6ecadb13e45c5ae140fce75758fdc" target="_blank">
    <img src="https://img.shields.io/badge/🎥 Video Demo-Watch Now-red?style=for-the-badge" alt="Video Demo">
  </a>
</div>

---

## 🌟 Live Demo

**🔗 Application URL**: [https://complaint-manager-seven.vercel.app/](https://complaint-manager-seven.vercel.app/)

**🎬 Video Walkthrough**: [Watch the full demo on Loom](https://www.loom.com/share/1ce6ecadb13e45c5ae140fce75758fdc)

Experience the application in action! The live demo showcases all features including user registration, complaint submission, admin dashboard, and real-time notifications.

---

## ✨ Features

### 🔐 **Authentication & Security**
- **Secure JWT Authentication** with bcrypt password hashing
- **Role-based Access Control** (User/Admin permissions)
- **Session Management** with secure token verification

### 👥 **User Experience**
- **🏠 User Dashboard**: Submit complaints, track status, view history
- **⚡ Admin Panel**: Comprehensive complaint management with analytics
- **🌙 Dark/Light Mode** toggle for comfortable viewing
- **📱 Fully Responsive** design across all devices
- **🔔 Toast Notifications** for instant user feedback

### 📋 **Complaint Management**
- **Complete Lifecycle Tracking**: Open → In Progress → Resolved → Closed
- **Priority Levels**: Low, Medium, High classification
- **Advanced Filtering & Search** capabilities
- **📧 Real-time Email Notifications** for new and updated complaints

### 🎨 **Modern UI/UX**
- Built with **Tailwind CSS** and **Shadcn/UI** components
- Clean, intuitive interface design
- Smooth animations and transitions

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| **Backend** | Next.js API Routes, Node.js |
| **Database** | MongoDB |
| **Authentication** | JWT, bcrypt |
| **UI Components** | Shadcn/UI, Lucide Icons |
| **Notifications** | Sonner (Toast), **Nodemailer** (Email) |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
complaint-management-system/
├── 📂 app/
│   ├── 📂 api/                # 🔌 Backend API routes
│   │   ├── 📂 auth/           # 🔐 Authentication endpoints
│   │   └── 📂 complaints/     # 📋 CRUD operations for complaints
│   ├── 📂 auth/               # 🚪 Login/Register pages
│   └── ... and other pages
├── 📂 components/
│   └── 📂 ui/                 # 🎨 Reusable Shadcn/UI components
├── 📂 hooks/
│   └── 📄 use-auth.tsx        # 🪝 Custom auth hook for session management
├── 📂 lib/
│   ├── 📂 models/             # 🗃️ MongoDB data models (User, Complaint)
│   ├── 📄 email.ts            # 📧 Nodemailer email sending logic
│   ├── 📄 mongodb.ts          # 🔌 Database connection logic
│   └── 📄 jwt.ts              # 🎫 JWT signing and verification
├── 📄 .env.local              # ⚙️ Environment variables
└── 📄 next.config.mjs         # 🛠️ Next.js configuration
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or later)
- **npm** or **pnpm** package manager
- **MongoDB** instance (local or a free Atlas account)
- A **Gmail Account** with an **App Password** for sending emails.

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/dhamankarYash/ComplaintManager.git
   cd ComplaintManager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a file named `.env.local` in the root of your project and add the following variables:
   ```ini
   # 🔐 Authentication
   JWT_SECRET="generate-a-strong-secret-key-for-jwt"

   # 🗄️ Database
   MONGODB_URI="your-mongodb-connection-string"

   # 📧 Email Notifications (using Gmail)
   EMAIL_USER="your-email@gmail.com"
   EMAIL_PASS="your-16-digit-google-app-password"
   ```
   > **Important**: For `EMAIL_PASS`, you must generate a 16-digit **[App Password](https://support.google.com/mail/answer/185833)** from your Google Account security settings. Your regular Gmail password will not work.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser** to `http://localhost:3000`.

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Complaints
- `GET /api/complaints` - Fetch all complaints (admin) or user complaints
- `POST /api/complaints` - Create new complaint
- `PUT /api/complaints/[id]` - Update complaint status/details
- `DELETE /api/complaints/[id]` - Delete complaint

---

## 🎨 UI Components

The project uses **Shadcn/UI** components for a consistent and modern interface:

- **Forms**: Login, registration, and complaint submission forms
- **Tables**: Data tables for complaint listing with sorting and filtering
- **Modals**: Confirmation dialogs and detail views
- **Navigation**: Responsive sidebar and navigation components
- **Notifications**: Toast notifications for user feedback

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `JWT_SECRET` | Secret key for JWT token signing | ✅ |
| `MONGODB_URI` | MongoDB connection string | ✅ |
| `EMAIL_USER` | Gmail address for sending notifications | ✅ |
| `EMAIL_PASS` | Gmail App Password (16-digit) | ✅ |

### Database Schema

#### User Model
```typescript
{
  _id: ObjectId,
  name: string,
  email: string,
  password: string (hashed),
  role: "user" | "admin",
  createdAt: Date
}
```

#### Complaint Model
```typescript
{
  _id: ObjectId,
  title: string,
  description: string,
  category: string,
  priority: "low" | "medium" | "high",
  status: "open" | "in-progress" | "resolved" | "closed",
  userId: ObjectId,
  assignedTo?: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚀 Deployment

This project is optimized for deployment on **Vercel** and is currently live at: **[https://complaint-manager-seven.vercel.app/](https://complaint-manager-seven.vercel.app/)**

### Vercel Deployment Steps

1. **Push your code** to your GitHub repository.
2. **Import your repository** on the Vercel dashboard.
3. **Add your environment variables** (`JWT_SECRET`, `MONGODB_URI`, `EMAIL_USER`, `EMAIL_PASS`) in the Vercel project settings.
4. **Deploy!** Vercel will automatically build and deploy your application. Subsequent pushes to the connected branch will trigger automatic redeployments.

### Alternative Deployment Options

- **Netlify**: Configure build settings and environment variables
- **Railway**: Deploy with automatic GitHub integration
- **DigitalOcean App Platform**: Configure app spec and environment variables

---

## 🧪 Testing

### Running Tests
```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run tests in watch mode
npm run test:watch
```

### Test Coverage
The project includes tests for:
- API endpoints
- Authentication middleware
- Database operations
- UI components

---

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured for secure cross-origin requests
- **Rate Limiting**: API rate limiting to prevent abuse
- **SQL Injection Prevention**: MongoDB's built-in protection

---

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add some amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Code Style Guidelines
- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Add tests for new features

---


## 🎉 Acknowledgments

- **Next.js** team for the amazing framework
- **Shadcn/UI** for the beautiful component library
- **Vercel** for seamless deployment
- **MongoDB** for the flexible database solution

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/dhamankarYash">Yash Dhamankar</a></p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
