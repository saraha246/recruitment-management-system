# Recruitment Management System (RMS)

A full-stack web application that streamlines end-to-end hiring — from job posting and candidate applications to interview scheduling and hiring decisions. Built with React, Node.js, PostgreSQL, Firebase, and Supabase.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js + Vite + Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | PostgreSQL + Sequelize ORM |
| Authentication | JWT + Firebase Google SSO |
| File Storage | Supabase Storage |
| Push Notifications | Firebase Cloud Messaging (FCM) |
| Email Service | Nodemailer + Gmail SMTP |
| Version Control | Git + GitHub |

---

## Features

**Candidate**
- Register with email OTP verification or Google SSO
- Browse and search open job listings
- Apply with PDF resume upload
- Track application status in real time

**Recruiter**
- Post, edit, and delete job listings
- View all applications with candidate details and resume
- Manage application pipeline (Applied → Shortlisted → Interview → Offer → Hired/Rejected)
- Schedule interviews with round and feedback tracking

**Admin**
- View and manage all users (candidates, recruiters, admins)
- Deactivate user accounts
- Manage departments

**Common**
- Role-based access control (RBAC) — candidate, recruiter, admin
- JWT authentication with protected routes (frontend + backend)
- Push notifications via Firebase FCM
- Responsive UI

---

## Project Structure

```
recruitment/
├── client/                  # React frontend (Vite)
│   ├── public/
│   │   └── firebase-messaging-sw.js   # FCM service worker
│   └── src/
│       ├── components/      # Navbar, ProtectedRoute
│       ├── pages/           # Login, Register, VerifyOTP, JobListing, PostJob, ApplicationsInbox, AdminDashboard
│       └── firebase.js      # Firebase client config
├── config/
│   ├── firebase.js          # Firebase Admin SDK (backend)
│   └── supabase.js          # Supabase client
├── controller/              # authController, jobController, applicationController, interviewController, adminController, userController
├── db/
│   ├── migrations/          # Sequelize migrations
│   └── models/              # Sequelize models (User, Job, Application, Interview, Department)
├── middleware/
│   ├── authMiddleware.js    # JWT verification
│   ├── roleCheck.js         # RBAC role enforcement
│   └── uploadMiddleware.js  # Multer memory storage
├── route/                   # authRoute, jobRoute, applicationRoute, interviewRoute, adminRoute, userRoute
├── app.js                   # Express app entry point
└── .env                     # Environment variables (not committed)
```

---

## Prerequisites

- Node.js v18+
- PostgreSQL (running locally or remote)
- A Firebase project (Authentication + Cloud Messaging enabled)
- A Supabase project with a `resumes` storage bucket
- A Gmail account with an App Password for SMTP

---

## Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/saraha246/recruitment-management-system.git
cd recruitment-management-system
```

### 2. Install backend dependencies

```bash
npm install
```

### 3. Install frontend dependencies

```bash
cd client
npm install
cd ..
```

### 4. Set up environment variables

Create a `.env` file in the project root:

```env
# App
APP_PORT=3000
NODE_ENV=development

# Database
DB_USERNAME=postgres
DB_PASSWORD=your_db_password
DB_NAME=rms_db
DB_HOST=127.0.0.1
DB_PORT=5432

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_supabase_service_role_key

# Gmail SMTP
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_gmail_app_password
```

### 5. Set up Firebase

- Download your Firebase service account key from Firebase Console → Project Settings → Service Accounts → Generate new private key
- Save it as `firebaseServiceAccount.json` in the project root (already in `.gitignore`)

### 6. Create the database

```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

### 7. Run the backend

```bash
nodemon app.js
```

### 8. Run the frontend

```bash
cd client
npm run dev
```

Frontend runs on `http://localhost:5173` (or `5174` if port is in use)  
Backend runs on `https://recruitment-management-system-production.up.railway.app`

---

## API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | /api/v1/auth/signup | Public | Register new user |
| POST | /api/v1/auth/login | Public | Login with email/password |
| POST | /api/v1/auth/google-login | Public | Login with Google SSO |
| POST | /api/v1/auth/send-otp | Public | Send OTP to email before registration |
| POST | /api/v1/auth/verify-otp | Public | Verify OTP and activate account |

### Jobs
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | /api/v1/jobs | Public | Get all open jobs |
| GET | /api/v1/jobs/:id | Public | Get single job |
| POST | /api/v1/jobs | Recruiter/Admin | Create job |
| PUT | /api/v1/jobs/:id | Recruiter/Admin | Update job |
| DELETE | /api/v1/jobs/:id | Recruiter/Admin | Delete job |

### Applications
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | /api/v1/applications | Candidate | Apply for a job (with resume) |
| GET | /api/v1/applications | Recruiter/Admin | Get all applications |
| GET | /api/v1/applications/:id | Authenticated | Get single application |
| PATCH | /api/v1/applications/:id | Recruiter/Admin | Update application status |

### Interviews
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | /api/v1/interviews | Recruiter/Admin | Schedule interview |
| GET | /api/v1/interviews/:applicationId | Authenticated | Get interviews for application |
| PATCH | /api/v1/interviews/:id/feedback | Recruiter/Admin | Add interview feedback |

### Admin
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | /api/v1/admin/users | Admin | Get all users |
| PATCH | /api/v1/admin/users/:id/deactivate | Admin | Deactivate a user |
| GET | /api/v1/admin/departments | Admin | Get all departments |
| POST | /api/v1/admin/departments | Admin | Create department |

### Users
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | /api/v1/users/fcm-token | Authenticated | Save FCM push notification token |

---

## Environment Notes

- `firebaseServiceAccount.json` and `.env` are in `.gitignore` — never commit these
- Supabase `service_role` key is backend-only — never expose in frontend code
- Gmail App Password is required (regular Gmail password won't work for SMTP)

---

## Author

Anugraha Santhanam  
