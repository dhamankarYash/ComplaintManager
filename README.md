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

---

## ✨ Features

### 🔐 **Authentication & Security**
- **Secure JWT Authentication** with bcrypt password hashing
- **Role-based Access Control** (User/Admin permissions)
- **Session Management** with automatic token refresh

### 👥 **User Experience**
- **🏠 User Dashboard**: Submit complaints, track status, view history
- **⚡ Admin Panel**: Comprehensive complaint management with analytics
- **🌙 Dark/Light Mode** toggle for comfortable viewing
- **📱 Fully Responsive** design across all devices
- **🔔 Toast Notifications** for instant user feedback

### 📋 **Complaint Management**
- **Complete Lifecycle Tracking**: Open → In Progress → Resolved → Closed
- **Priority Levels**: Low, Medium, High classification
- **Category Organization** for better complaint sorting
- **Advanced Filtering & Search** capabilities
- **📧 Email Notifications** for status updates

### 🎨 **Modern UI/UX**
- Built with **Tailwind CSS** and **Shadcn/UI** components
- Clean, intuitive interface design
- Smooth animations and transitions
- Accessibility-first approach

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| **Backend** | Next.js API Routes, Node.js |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JWT, bcrypt |
| **UI Components** | Shadcn/UI, Lucide Icons |
| **Notifications** | Sonner (Toast), Nodemailer (Email) |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
complaint-management-system/
├── 📂 app/
│   ├── 📂 admin/              # 🛡️ Admin dashboard & components
│   ├── 📂 api/                # 🔌 Backend API routes
│   │   ├── 📂 auth/           # 🔐 Authentication endpoints
│   │   └── 📂 complaints/     # 📋 CRUD operations
│   ├── 📂 auth/               # 🚪 Login/Register pages
│   ├── 📂 complaints/         # 📝 User complaint pages
│   └── 📂 dashboard/          # 🏠 Main user dashboard
├── 📂 components/
│   ├── 📂 ui/                 # 🎨 Reusable UI components
│   ├── 📄 auth-provider.tsx   # 🔐 Authentication context
│   └── 📄 navigation.tsx      # 🧭 Navigation component
├── 📂 hooks/
│   └── 📄 use-auth.tsx        # 🪝 Custom auth hook
├── 📂 lib/
│   ├── 📂 models/             # 🗃️ Database schemas
│   ├── 📄 mongodb.ts          # 🔌 Database connection
│   └── 📄 jwt.ts              # 🎫 JWT utilities
├── 📂 scripts/
│   └── 📄 seed-database.js    # 🌱 Database seeding
└── 📄 .env.local              # ⚙️ Environment variables
```

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have:

- 📦 **Node.js** (v18 or later)
- 🧶 **pnpm** package manager
- 🗄️ **MongoDB** instance (local or Atlas)
- 📧 **Email service** credentials (Gmail/SendGrid)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dhamankarYash/ComplaintManager.git
   cd ComplaintManager
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Seed the database** (Optional)
   ```bash
   node scripts/seed-database.js
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

---

## 📖 Usage Guide

### 👤 For Users

| Action | Description |
|--------|-------------|
| **🔐 Register/Login** | Create account or sign in with credentials |
| **📝 Submit Complaint** | Fill form with title, description, category, priority |
| **📊 Track Progress** | Monitor complaint status in real-time |
| **📧 Get Notified** | Receive email updates on status changes |

### 👨‍💼 For Administrators

| Action | Description |
|--------|-------------|
| **📈 Dashboard Overview** | View complaint statistics and analytics |
| **🔍 Filter & Search** | Find complaints by status, priority, keywords |
| **✏️ Update Status** | Change complaint status through workflow |
| **🗑️ Manage Complaints** | Edit or delete complaints as needed |

---

## 🔌 API Reference

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | User login |
| `GET` | `/api/auth/verify` | Verify JWT token |

### Complaint Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/complaints` | Create complaint | ✅ User |
| `GET` | `/api/complaints` | Get all complaints | ✅ Admin |
| `GET` | `/api/complaints/user` | Get user complaints | ✅ User |
| `PUT` | `/api/complaints/[id]` | Update complaint | ✅ Admin |
| `DELETE` | `/api/complaints/[id]` | Delete complaint | ✅ Admin |

### Admin Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/admin/stats` | Get dashboard stats | ✅ Admin |

---

## 🗄️ Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String,           // User email (unique)
  password: String,        // Hashed password
  role: String,           // 'user' | 'admin'
  createdAt: Date
}
```

### Complaints Collection
```javascript
{
  _id: ObjectId,
  title: String,                    // Complaint title
  description: String,              // Detailed description
  category: String,                 // Complaint category
  priority: String,                 // 'Low' | 'Medium' | 'High'
  status: String,                   // 'Open' | 'In Progress' | 'Resolved' | 'Closed'
  dateSubmitted: Date,              // Creation timestamp
  updatedAt: Date,                  // Last update timestamp
  userId: ObjectId,                 // Reference to user
  userEmail: String                 // User email for quick access
}
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in your project root:

```bash
# 🗄️ Database Configuration
MONGODB_URI="mongodb://localhost:27017/complaint-manager"
# or MongoDB Atlas: "mongodb+srv://username:password@cluster.mongodb.net/dbname"

# 🔐 Authentication
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters"

# 📧 Email Configuration (Gmail Example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
SMTP_FROM=your-email@gmail.com
ADMIN_EMAIL=admin@example.com

# 🌐 Application URL (for production)
NEXTAUTH_URL=http://localhost:3000
```

> **💡 Tip**: For Gmail, use an [App Password](https://support.google.com/mail/answer/185833) instead of your regular password.

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Connect your GitHub repository to [Vercel](https://vercel.com)
   - Add environment variables in project settings
   - Deploy automatically on every push

3. **Configure Environment**
   - Add all `.env.local` variables to Vercel project settings
   - Update `NEXTAUTH_URL` to your production domain

### Alternative Deployment Options

- **Railway**: Easy MongoDB integration
- **Heroku**: Classic PaaS deployment
- **Digital Ocean**: App Platform deployment
- **AWS**: Amplify or EC2 deployment

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 Bug Reports
- Use the issue tracker to report bugs
- Include steps to reproduce the issue
- Add screenshots if applicable

### 💡 Feature Requests
- Discuss new features in issues first
- Follow the feature request template
- Consider backward compatibility

### 🔧 Pull Requests

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests if applicable**
5. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support & Contact

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/dhamankarYash/ComplaintManager/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/dhamankarYash/ComplaintManager/discussions)
- 📧 **Email**: [your-email@example.com](mailto:your-email@example.com)

---

## 🙏 Acknowledgments

Special thanks to the amazing open-source community and the following projects:

- **[Next.js](https://nextjs.org/)** - The React framework for production
- **[MongoDB](https://www.mongodb.com/)** - Document database platform
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Shadcn/UI](https://ui.shadcn.com/)** - Beautiful UI components
- **[Vercel](https://vercel.com/)** - Deployment and hosting platform

---

<div align="center">
  <h3>⭐ Star this project if you found it helpful!</h3>
  <p>Made with ❤️ by <a href="https://github.com/dhamankarYash">Yash Dhamankar</a></p>
</div>

---

## 📊 Project Stats

<div align="center">
  <img src="https://img.shields.io/github/stars/dhamankarYash/ComplaintManager?style=social" alt="Stars">
  <img src="https://img.shields.io/github/forks/dhamankarYash/ComplaintManager?style=social" alt="Forks">
  <img src="https://img.shields.io/github/issues/dhamankarYash/ComplaintManager" alt="Issues">
  <img src="https://img.shields.io/github/license/dhamankarYash/ComplaintManager" alt="License">
</div>
